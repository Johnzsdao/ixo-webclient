import React from 'react'
import { Card } from '../Card'
import { Widget } from '../types'
import { ReactComponent as CommentIcon } from 'assets/images/icon-comment-alt.svg'
import { ReactSVG } from 'react-svg'
import { requireCheckDefault } from 'utils/images'

interface Props {
  widget: Widget
}

const Connect: React.FC<Props> = ({ widget }) => {
  return (
    <Card
      icon={<CommentIcon />}
      title='Connect'
      columns={2}
      items={(widget?.controls ?? [])
        .filter((control) => control[`@type`] === 'External')
        .filter((control) => {
          try {
            require(`../../../${control.icon}`)
            return true
          } catch {
            return false
          }
        })
        .map((control) => ({
          icon: <ReactSVG src={requireCheckDefault(require(`../../../${control.icon}`))} />,
          content: control.title,
          onClick: () => {
            window.open(control.endpoint)
          },
        }))}
    />
  )
}

export default Connect
