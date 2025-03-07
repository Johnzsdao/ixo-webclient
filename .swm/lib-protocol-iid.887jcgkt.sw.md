---
id: 887jcgkt
title: lib-protocol-iid
file_version: 1.1.3
app_version: 1.14.0
---

**AddLinkedEntity**

<br/>

Function used to add a linked entity to a blockchain using provided signingClient and signer.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/lib/protocol/iid.ts
<!-- collapsed -->

```typescript
110    export const AddLinkedEntity = async (
111      client: SigningStargateClient,
112      signer: TSigner,
113      payload: {
114        did: string
115        linkedEntity: LinkedEntity
116      },
117    ) => {
118      const { did, linkedEntity } = payload
119      const message = {
120        typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
121        value: ixo.iid.v1beta1.MsgAddLinkedEntity.fromPartial({
122          id: did,
123          linkedEntity: ixo.iid.v1beta1.LinkedEntity.fromPartial(linkedEntity),
124          signer: signer.address,
125        }),
126      }
127      const response: DeliverTxResponse = await client.signAndBroadcast(signer.address, [message], fee)
128      console.info('AddLinkedEntity', response)
129      return response
130    }
```

<br/>

**AddVerificationMethod**

<br/>

Function used to add a verification method to a blockchain using provided signingClient and signer.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/lib/protocol/iid.ts
<!-- collapsed -->

```typescript
382    export const AddVerificationMethod = async (
383      client: SigningStargateClient,
384      signer: TSigner,
385      payload: { did: string; verifications: Verification[] },
386    ) => {
387      const { did, verifications } = payload
388    
389      const messages = verifications.map((verification) => ({
390        typeUrl: '/ixo.iid.v1beta1.MsgAddVerification',
391        value: ixo.iid.v1beta1.MsgAddVerification.fromPartial({
392          id: did,
393          verification,
394          signer: signer.address,
395        }),
396      }))
397    
398      console.log('AddVerificationMethod', { messages })
399      const response: DeliverTxResponse = await client.signAndBroadcast(signer.address, messages, fee)
400      console.log('AddVerificationMethod', { response })
401      return response
402    }
```

<br/>

**CreateIidDocForGroup**

<br/>

Function used to create a iid document for dao group address using provided signingClient, signer and did.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/lib/protocol/iid.ts
<!-- collapsed -->

```typescript
56     export const CreateIidDocForGroup = async (client: SigningStargateClient, signer: TSigner, did: string) => {
57       const address = did.replace('did:ixo:wasm:', '')
58     
59       const message = {
60         typeUrl: '/ixo.iid.v1beta1.MsgCreateIidDocument',
61         value: ixo.iid.v1beta1.MsgCreateIidDocument.fromPartial({
62           context: customMessages.iid.createAgentIidContext(),
63           id: did,
64           alsoKnownAs: 'group',
65           verifications: [
66             ixo.iid.v1beta1.Verification.fromPartial({
67               relationships: ['authentication'],
68               method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
69                 id: did,
70                 type: 'CosmosAccountAddress',
71                 blockchainAccountID: address,
72                 controller: '{id}',
73               }),
74             }),
75             ixo.iid.v1beta1.Verification.fromPartial({
76               relationships: ['authentication'],
77               method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
78                 id: did + '#' + address,
79                 type: 'CosmosAccountAddress',
80                 blockchainAccountID: address,
81                 controller: '{id}',
82               }),
83             }),
84           ],
85           signer: signer.address,
86           controllers: [did],
87         }),
88       }
89     
90       console.log('CreateIidDocForGroup', { message })
91       const response = await client.signAndBroadcast(signer.address, [message], fee)
92       console.log('CreateIidDocForGroup', { response })
93       return response
94     }
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/887jcgkt).
