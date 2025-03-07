import { Box } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useState, useCallback, useRef } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import _ from 'lodash'
// @ts-ignore
import DragDrop from 'editorjs-drag-drop'
// @ts-ignore
import Undo from 'editorjs-undo'
import { TEntityPageModel } from 'types/entities'
import { Wrapper, Row } from './SetupPageContent.styles'
import { EDITOR_JS_TOOLS } from './SetupPageContent.constants'
import { OutputBlockData, OutputData } from '@editorjs/editorjs'

const ReactEditorJS = createReactEditorJS()

interface Props {
  entityType: string
  page: TEntityPageModel
  onChange?: (page: TEntityPageModel) => void
  onClose: () => void
}

const SetupPageContent: React.FC<Props> = ({ page = {}, entityType, onChange, onClose }): JSX.Element => {
  const editorCore = useRef(null)

  const DefHeroImageData: OutputBlockData = {
    id: 'page-hero-image',
    type: 'heroImage',
    data: undefined,
  }

  const DefPageTitleData: OutputBlockData = {
    id: 'page-title',
    type: 'pageTitle',
    data: undefined,
  }

  const DefPageContentData: OutputBlockData = {
    id: 'page-content',
    type: 'pageContent',
    data: undefined,
  }

  const [value, setValue] = useState<OutputData>({
    time: new Date().getTime(),
    blocks: [
      ...(Object.keys(page).length > 0 ? _.values(page) : [DefHeroImageData, DefPageTitleData, DefPageContentData]),
    ],
  })

  const handleChange = (): void => {
    onChange && onChange(_.keyBy(value.blocks, 'id'))
  }
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleReady = useCallback(() => {
    const editor = (editorCore.current as any)._editorJS
    new Undo({ editor })
    new DragDrop(editor)
  }, [])

  const handleSave = useCallback(async () => {
    const data = await (editorCore.current as any).save()
    setValue(data)
  }, [])

  return (
    <Wrapper>
      <Row className='align-items-center justify-content-end'>
        <Box className='d-flex' style={{ gap: 20 }}>
          <Button variant='secondary' onClick={onClose}>
            Back
          </Button>
          <Button variant='primary' onClick={handleChange}>
            Continue
          </Button>
        </Box>
      </Row>

      <Row style={{ display: 'block', pointerEvents: onChange ? 'auto' : 'none' }}>
        <ReactEditorJS
          onInitialize={handleInitialize}
          onReady={handleReady}
          tools={EDITOR_JS_TOOLS}
          defaultValue={value}
          onChange={handleSave}
        />
      </Row>
    </Wrapper>
  )
}

export default SetupPageContent
