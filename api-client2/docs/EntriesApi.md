# EntriesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiEntriesByDateRangeGet**](#apientriesbydaterangeget) | **GET** /api/Entries/by-date-range | |
|[**apiEntriesCurrentPeriodGet**](#apientriescurrentperiodget) | **GET** /api/Entries/current-period | |
|[**apiEntriesEntryIdGet**](#apientriesentryidget) | **GET** /api/Entries/{entryId} | |
|[**apiEntriesIdDelete**](#apientriesiddelete) | **DELETE** /api/Entries/{id} | |
|[**apiEntriesIdPut**](#apientriesidput) | **PUT** /api/Entries/{id} | |
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

const { status, data } = await apiInstance.apiEntriesByDateRangeGet(
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|


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

# **apiEntriesCurrentPeriodGet**
> apiEntriesCurrentPeriodGet()


### Example

```typescript
import {
    EntriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EntriesApi(configuration);

const { status, data } = await apiInstance.apiEntriesCurrentPeriodGet();
```

### Parameters
This endpoint does not have any parameters.


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

let entryId: number; // (default to undefined)

const { status, data } = await apiInstance.apiEntriesEntryIdGet(
    entryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entryId** | [**number**] |  | defaults to undefined|


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

# **apiEntriesIdDelete**
> apiEntriesIdDelete()


### Example

```typescript
import {
    EntriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EntriesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiEntriesIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

# **apiEntriesIdPut**
> apiEntriesIdPut()


### Example

```typescript
import {
    EntriesApi,
    Configuration,
    UpdateEntryRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new EntriesApi(configuration);

let id: number; // (default to undefined)
let updateEntryRequest: UpdateEntryRequest; // (optional)

const { status, data } = await apiInstance.apiEntriesIdPut(
    id,
    updateEntryRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateEntryRequest** | **UpdateEntryRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


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

