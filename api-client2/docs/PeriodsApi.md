# PeriodsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPeriodsByDateRangeGet**](#apiperiodsbydaterangeget) | **GET** /api/Periods/by-date-range | |
|[**apiPeriodsGet**](#apiperiodsget) | **GET** /api/Periods | |
|[**apiPeriodsPost**](#apiperiodspost) | **POST** /api/Periods | |
|[**apiPeriodsTableGet**](#apiperiodstableget) | **GET** /api/Periods/table | |

# **apiPeriodsByDateRangeGet**
> apiPeriodsByDateRangeGet()


### Example

```typescript
import {
    PeriodsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PeriodsApi(configuration);

let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPeriodsByDateRangeGet(
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

# **apiPeriodsGet**
> apiPeriodsGet()


### Example

```typescript
import {
    PeriodsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PeriodsApi(configuration);

const { status, data } = await apiInstance.apiPeriodsGet();
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

# **apiPeriodsPost**
> apiPeriodsPost()


### Example

```typescript
import {
    PeriodsApi,
    Configuration,
    CreatePeriodRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PeriodsApi(configuration);

let createPeriodRequest: CreatePeriodRequest; // (optional)

const { status, data } = await apiInstance.apiPeriodsPost(
    createPeriodRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPeriodRequest** | **CreatePeriodRequest**|  | |


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

# **apiPeriodsTableGet**
> apiPeriodsTableGet()


### Example

```typescript
import {
    PeriodsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PeriodsApi(configuration);

let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPeriodsTableGet(
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

