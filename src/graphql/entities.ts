import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { validateEntityDid } from 'utils/validation'

// GET_ALL_ENTITIES
const GET_ALL_ENTITIES = gql`
  query GetAllEntities($relayerNode: String!, $owner: String) {
    entities(
      filter: {
        not: { type: { startsWith: "asset" } }
        or: [
          { relayerNode: { equalTo: $relayerNode } }
          { id: { equalTo: $relayerNode } }
          { owner: { equalTo: $owner } }
        ]
      }
    ) {
      nodes {
        id
        accordedRight
        accounts
        alsoKnownAs
        assertionMethod
        authentication
        capabilityInvocation
        context
        capabilityDelegation
        controller
        credentials
        endDate
        entityVerified
        externalId
        keyAgreement
        linkedClaim
        linkedResource
        linkedEntity
        nodeId
        owner
        metadata
        service
        relayerNode
        startDate
        settings
        status
        type
        verificationMethod
      }
      totalCount
    }
  }
`
export function useGetAllEntities(connectedAccount?: string) {
  const { loading, error, data, refetch } = useQuery(GET_ALL_ENTITIES, {
    variables: { relayerNode: process.env.REACT_APP_RELAYER_NODE, owner: connectedAccount },
  })
  return { loading, error, data: data?.entities?.nodes ?? [], refetch }
}

// GET_ENTITY_BY_ID
const GET_ENTITY_BY_ID = gql`
  query GetEntityById($id: String!) {
    entity(id: $id) {
      accordedRight
      accounts
      alsoKnownAs
      assertionMethod
      authentication
      capabilityDelegation
      capabilityInvocation
      context
      controller
      credentials
      endDate
      entityVerified
      externalId
      id
      linkedClaim
      keyAgreement
      linkedEntity
      linkedResource
      metadata
      nodeId
      owner
      relayerNode
      service
      settings
      startDate
      status
      type
      verificationMethod
    }
  }
`
export function useGetEntityById(id: string) {
  const { loading, error, data, refetch } = useQuery(GET_ENTITY_BY_ID, {
    variables: { id },
    skip: !validateEntityDid(id),
  })
  return { loading, error, data: data?.entity, refetch }
}

export function useGetEntityByIdLazyQuery() {
  const [getEntityById, { loading, error, data, refetch }] = useLazyQuery(GET_ENTITY_BY_ID)

  const fetchEntityById = (id: string) => {
    if (validateEntityDid(id)) {
      getEntityById({ variables: { id } })
    }
  }

  return { loading, error, data: data?.entity, refetch, fetchEntityById }
}

// GET_ALL_ASSET_COLLECTIONS
const GET_ALL_ASSET_COLLECTIONS = gql`
  query GetAllAssetCollections {
    entities(filter: { type: { equalTo: "asset/collection" } }) {
      nodes {
        id
        accordedRight
        accounts
        alsoKnownAs
        assertionMethod
        authentication
        capabilityInvocation
        context
        capabilityDelegation
        controller
        credentials
        endDate
        entityVerified
        externalId
        keyAgreement
        linkedClaim
        linkedResource
        linkedEntity
        nodeId
        owner
        metadata
        service
        relayerNode
        startDate
        settings
        status
        type
        verificationMethod
      }
      totalCount
    }
  }
`
export function useGetAllCollections() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_ASSET_COLLECTIONS)
  return { loading, error, data: data?.entities?.nodes ?? [], refetch }
}

// GET_ASSET_DEVICES_BY_COLLECTIONID
const GET_ASSET_DEVICES_BY_COLLECTIONID = gql`
  query GetAssetDevicesByCollectionId($collectionId: String!) {
    entities(
      filter: {
        iidById: { context: { contains: [{ key: "class", val: $collectionId }] } }
        type: { equalTo: "asset/device" }
      }
    ) {
      nodes {
        id
        accordedRight
        accounts
        alsoKnownAs
        assertionMethod
        authentication
        capabilityInvocation
        context
        capabilityDelegation
        controller
        credentials
        endDate
        entityVerified
        externalId
        keyAgreement
        linkedClaim
        linkedResource
        linkedEntity
        nodeId
        owner
        metadata
        service
        relayerNode
        startDate
        settings
        status
        type
        verificationMethod
      }
    }
  }
`
export function useGetAssetDevicesByCollectionId(collectionId: string) {
  const { loading, error, data, refetch } = useQuery(GET_ASSET_DEVICES_BY_COLLECTIONID, {
    variables: { collectionId },
    skip: !validateEntityDid(collectionId),
  })
  return { loading, error, data: data?.entities?.nodes ?? [], refetch }
}

// GET_ASSET_DEVICES_LENGTH_BY_COLLECTIONID_AND_OWNER
const GET_ASSET_DEVICES_LENGTH_BY_COLLECTIONID_AND_OWNER = gql`
  query GetAssetDevicesByCollectionIdAndOwner($collectionId: String!, $ownerAddress: String) {
    entities(
      filter: {
        iidById: { context: { contains: [{ key: "class", val: $collectionId }] } }
        type: { equalTo: "asset/device" }
        owner: { equalTo: $ownerAddress }
      }
    ) {
      totalCount
      nodes {
        id
        accordedRight
        accounts
        alsoKnownAs
        assertionMethod
        authentication
        capabilityInvocation
        context
        capabilityDelegation
        controller
        credentials
        endDate
        entityVerified
        externalId
        keyAgreement
        linkedClaim
        linkedResource
        linkedEntity
        nodeId
        owner
        metadata
        service
        relayerNode
        startDate
        settings
        status
        type
        verificationMethod
      }
    }
  }
`
export function useGetAssetDevicesByCollectionIdAndOwner(collectionId: string, ownerAddress?: string) {
  const { loading, error, data, refetch } = useQuery(GET_ASSET_DEVICES_LENGTH_BY_COLLECTIONID_AND_OWNER, {
    variables: { collectionId, ...(ownerAddress ? { ownerAddress } : {}) },
    skip: !validateEntityDid(collectionId),
  })
  return { loading, error, data: data?.entities?.nodes ?? [], totalCount: data?.entities?.totalCount ?? 0, refetch }
}
