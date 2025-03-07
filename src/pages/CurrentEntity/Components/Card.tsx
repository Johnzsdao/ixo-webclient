import { FlexBox, HTMLFlexBoxProps, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { ReactNode } from 'react'
import { ReactComponent as ExpandIcon } from 'assets/images/icon-expand-alt.svg'
import { useTheme } from 'styled-components'

interface Props extends HTMLFlexBoxProps {
  icon?: JSX.Element
  label: string
  actionIcon?: JSX.Element
  onAction?: () => void
  children?: ReactNode
}

const Card: React.FC<Props> = ({
  icon,
  label,
  actionIcon = <ExpandIcon />,
  onAction,
  children,
  ...rest
}): JSX.Element => {
  const theme: any = useTheme()
  return (
    <FlexBox
      direction='column'
      width={'100%'}
      height='100%'
      background={theme.ixoGradientDark2}
      borderRadius={'4px'}
      p={5}
      border={'1px solid #083347'}
      gap={6}
      {...rest}
    >
      {/* Card Header */}
      <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
        <FlexBox alignItems='center' gap={2}>
          {icon && (
            <SvgBox color='white' svgWidth={4.5} svgHeight={4.5}>
              {icon}
            </SvgBox>
          )}
          <Typography variant='secondary' color='white' size='lg'>
            {label}
          </Typography>
        </FlexBox>
        <SvgBox color={theme.ixoDarkBlue} svgWidth={6} cursor='pointer' onClick={onAction}>
          {actionIcon}
        </SvgBox>
      </FlexBox>
      {children}
    </FlexBox>
  )
}

export default Card
