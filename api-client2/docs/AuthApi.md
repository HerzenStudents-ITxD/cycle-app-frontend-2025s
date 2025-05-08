# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAuthAuthenticatePost**](#apiauthauthenticatepost) | **POST** /api/auth/authenticate | |
|[**apiAuthCompleteRegistrationPost**](#apiauthcompleteregistrationpost) | **POST** /api/auth/complete-registration | |
|[**apiAuthVerifyPost**](#apiauthverifypost) | **POST** /api/auth/verify | |

# **apiAuthAuthenticatePost**
> apiAuthAuthenticatePost(body)


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let body: string; //

const { status, data } = await apiInstance.apiAuthAuthenticatePost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **string**|  | |


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

# **apiAuthCompleteRegistrationPost**
> apiAuthCompleteRegistrationPost()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    CompleteRegistrationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let completeRegistrationRequest: CompleteRegistrationRequest; // (optional)

const { status, data } = await apiInstance.apiAuthCompleteRegistrationPost(
    completeRegistrationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **completeRegistrationRequest** | **CompleteRegistrationRequest**|  | |


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

# **apiAuthVerifyPost**
> apiAuthVerifyPost()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    VerifyCodeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let verifyCodeRequest: VerifyCodeRequest; // (optional)

const { status, data } = await apiInstance.apiAuthVerifyPost(
    verifyCodeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **verifyCodeRequest** | **VerifyCodeRequest**|  | |


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

