# EmailVerificationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiEmailVerificationSendCodePost**](#apiemailverificationsendcodepost) | **POST** /api/EmailVerification/send-code | |
|[**apiEmailVerificationVerifyCodePost**](#apiemailverificationverifycodepost) | **POST** /api/EmailVerification/verify-code | |

# **apiEmailVerificationSendCodePost**
> apiEmailVerificationSendCodePost()


### Example

```typescript
import {
    EmailVerificationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EmailVerificationApi(configuration);

let email: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailVerificationSendCodePost(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | (optional) defaults to undefined|


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

# **apiEmailVerificationVerifyCodePost**
> apiEmailVerificationVerifyCodePost()


### Example

```typescript
import {
    EmailVerificationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EmailVerificationApi(configuration);

let email: string; // (optional) (default to undefined)
let code: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailVerificationVerifyCodePost(
    email,
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | (optional) defaults to undefined|
| **code** | [**string**] |  | (optional) defaults to undefined|


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

