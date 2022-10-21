import React, { FunctionComponent } from 'react'
import { ContentContainer } from '../Splash.components'

import {
  SectionHeading,
  CollectionContainer,
  CardsContainer,
  Card,
  CardImage,
} from './SplashPartnersSection.components'
import { partners as PARTNERS } from '../splash-config.json'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SplashPartnersSection: FunctionComponent<Props> = () => {
  const isImageExternalLink = (imageSource: string): boolean => {
    return imageSource.trim().startsWith('http')
  }

  return (
    <ContentContainer>
      <CollectionContainer>
        <SectionHeading>Launchpad Sponsors and Partners</SectionHeading>
        <CardsContainer>
          {PARTNERS.length > 0 &&
            PARTNERS.map((sponsor) => {
              return (
                <Card
                  key={sponsor.title}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  backgroundColor={sponsor.color}
                >
                  <CardImage
                    src={
                      isImageExternalLink(sponsor.image)
                        ? sponsor.image
                        : require(`assets/images/splash/partners/${sponsor.image}`)
                            .default ||
                          require(`assets/images/splash/partners/${sponsor.image}`)
                    }
                    alt={sponsor.title}
                    loading="lazy"
                  />
                </Card>
              )
            })}
        </CardsContainer>
      </CollectionContainer>
    </ContentContainer>
  )
}

export default SplashPartnersSection
