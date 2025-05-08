# EntriesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiEntriesByDateRangeGet**](#apientriesbydaterangeget) | **GET** /api/Entries/by-date-range | |
|[**apiEntriesEntryIdDelete**](#apientriesentryiddelete) | **DELETE** /api/Entries/{entryId} | |
|[**apiEntriesEntryIdGet**](#apientriesentryidget) | **GET** /api/Entries/{entryId} | |
|[**apiEntriesEntryIdPut**](#apientriesentryidput) | **PUT** /api/Entries/{entryId} | |
|[**apiEntriesPost**](#apientriespost) | **POST** /api/Entries | |

# **apiEntriesByDateRangeGet**
> apiEntriesByDateRangeGet()


### Example

```typescript
import {
    EntriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EntriesApi(configuration);

let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)
let userId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEntriesByDateRangeGet(
    startDate,
    endDate,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|
| **userId** | [**string**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEntriesEntryIdDelete**
> apiEntriesEntryIdDelete()


### Example

```typescript
import {
    EntriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EntriesApi(configuration);

let entryId: string; // (default to undefined)

const { status, data } = await apiInstance.apiEntriesEntryIdDelete(
    entryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entryId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEntriesEntryIdGet**
> apiEntriesEntryIdGet()


### Example

```typescript
import {
    EntriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EntriesApi(configuration);

let entryId: string; // (default to undefined)

const { status, data } = await apiInstance.apiEntriesEntryIdGet(
    entryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entryId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEntriesEntryIdPut**
> apiEntriesEntryIdPut()


### Example

```typescript
import {
    EntriesApi,
    Configuration,
    UpdateEntryRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new EntriesApi(configuration);

let entryId: string; // (default to undefined)
let updateEntryRequest: UpdateEntryRequest; // (optional)

const { status, data } = await apiInstance.apiEntriesEntryIdPut(
    entryId,
    updateEntryRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateEntryRequest** | **UpdateEntryRequest**|  | |
| **entryId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEntriesPost**
> apiEntriesPost()


### Example

```typescript
import {
    EntriesApi,
    Configuration,
    CreateEntryRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new EntriesApi(configuration);

let createEntryRequest: CreateEntryRequest; // (optional)

const { status, data } = await apiInstance.apiEntriesPost(
    createEntryRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createEntryRequest** | **CreateEntryRequest**|  | |


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

