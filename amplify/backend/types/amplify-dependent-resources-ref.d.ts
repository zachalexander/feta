export type AmplifyDependentResourcesAttributes = {
    "api": {
        "feta": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "feta": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "storage": {
        "fetavideouploads": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "video": {
        "fetadevvodservice": {
            "oVODInputS3": "string",
            "oVODOutputS3": "string",
            "oVodOutputUrl": "string"
        }
    }
}