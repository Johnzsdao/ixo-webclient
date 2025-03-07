// @ts-nocheck
import * as ReactDOMServer from 'react-dom/server'
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs'
import { Typography } from 'components/Typography'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { ReactComponent as ImageOutlineIcon } from 'assets/images/icon-image-outline.svg'
import CustomImage from './CustomImage'

const HeroImage: ToolConstructable | ToolSettings = {
  ...CustomImage,
  config: {
    ...CustomImage.config,
    buttonContent: ReactDOMServer.renderToString(
      <FlexBox width='100%' justifyContent='flex-start' alignItems='center' gap={2}>
        <SvgBox color={theme.ixoGrey700} svgWidth={10} svgHeight={10}>
          <ImageOutlineIcon />
        </SvgBox>
        <Typography variant='secondary' size='2xl' color='grey700'>
          Add a Hero Image
        </Typography>
      </FlexBox>,
    ),
  },
}

export default HeroImage
