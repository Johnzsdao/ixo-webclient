import React from 'react'
import { EDITOR_JS_TOOLS } from 'pages/CreateEntity/Forms/PropertiesForm/SetupPageContent/SetupPageContent.constants'
import { createReactEditorJS } from 'react-editor-js'
import styled from 'styled-components'
import { Box } from 'components/App/App.styles'
import { OutputBlockData } from '@editorjs/editorjs'

const ReactEditorJS = createReactEditorJS()

const Wrapper = styled(Box)`
  width: 100%;

  .codex-editor {
    &__redactor {
      padding-bottom: 50px !important;
    }
  }

  .ce-block {
    &__content {
      max-width: unset;
    }
  }
  .image-tool {
    &__image-picture {
      width: 100%;
    }
    &__caption:empty {
      display: none;
    }
  }
`

interface Props {
  page: OutputBlockData[]
}

const PageContent: React.FC<Props> = ({ page }): JSX.Element => {
  const nonEmptyPage = page?.filter((content) => !!content.data)

  return (
    <Wrapper>
      {nonEmptyPage?.length > 0 && (
        <ReactEditorJS
          tools={EDITOR_JS_TOOLS}
          defaultValue={{ time: new Date().getTime(), blocks: nonEmptyPage }}
          readOnly
        />
      )}
    </Wrapper>
  )
}

export default PageContent
