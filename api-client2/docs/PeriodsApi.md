# PeriodsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPeriodsByDateRangeGet**](#apiperiodsbydaterangeget) | **GET** /api/Periods/by-date-range | |
|[**apiPeriodsGet**](#apiperiodsget) | **GET** /api/Periods | |
|[**apiPeriodsPost**](#apiperiodspost) | **POST** /api/Periods | |

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
let userId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPeriodsByDateRangeGet(
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

let userId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPeriodsGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
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

