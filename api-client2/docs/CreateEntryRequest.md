# CreateEntryRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_id** | **string** |  | [default to undefined]
**date** | **string** |  | [optional] [default to undefined]
**periodStarted** | **boolean** |  | [optional] [default to undefined]
**periodEnded** | **boolean** |  | [optional] [default to undefined]
**note** | **string** |  | [optional] [default to undefined]
**heaviness** | **string** |  | [optional] [default to undefined]
**symptoms** | [**Array&lt;SymptomRequest&gt;**](SymptomRequest.md) |  | [optional] [default to undefined]
**sex** | **string** |  | [optional] [default to undefined]
**mood** | **string** |  | [optional] [default to undefined]
**discharges** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateEntryRequest } from './api';

const instance: CreateEntryRequest = {
    user_id,
    date,
    periodStarted,
    periodEnded,
    note,
    heaviness,
    symptoms,
    sex,
    mood,
    discharges,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
