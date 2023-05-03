#!/usr/bin/env bash

# Set SA_NAME if $1 otherwise set to default

SA_NAME="${1:-default}"
SA_NAMESPACE="${2:-default}"


# if sa is set
if [ "$SA_NAME" == "default" ]; then
    echo "Using default Service Account"
else
    echo "Using Service Account: $SA_NAME"
fi

# if SA_NAMESPACE is set

if [ "$SA_NAMESPACE" == "default" ]; then
    echo "Using default Service Account"
else
    echo "Using Namespace: $SA_NAMESPACE"
fi

# if SA_NAME and SA_NAMESPACE are both default
if [ "$SA_NAME" == "default" ] && [ "$SA_NAMESPACE" == "default" ]; then
    echo "Must set SA_NAME and SA_NAMESPACE"
else
    echo "Using Service Account: $SA_NAME"
    echo "Using Namespace: $SA_NAMESPACE"
fi

# If oc whoami comes back with error, we're not logged in

if ! oc whoami &> /dev/null; then
    echo "Not logged into OpenShift"
    echo "You must be logged into openshift, try oc login"
    exit 1
fi



# Check if service account already exists

if oc get sa $SA_NAME -n $SA_NAMESPACE &> /dev/null; then
    echo "Service Account $SA_NAME already exists in $SA_NAMESPACE"
    echo "Please choose a different name"
    exit 1
fi


# Create Service Account

echo "Creating Service Account $SA_NAME in $SA_NAMESPACE"

oc create sa $SA_NAME -n $SA_NAMESPACE

oc policy add-role-to-user edit system:serviceaccount:$SA_NAMESPACE:$SA_NAME -n $SA_NAMESPACE

oc describe secret "$SA_NAME-token" | grep token: | awk '{print $2}'

