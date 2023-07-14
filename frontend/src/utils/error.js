function handleError(error, info) {
    // Handle the error here, e.g., log it, show a generic error message, etc.
    console.error('Global Error:', error);
}

function handleReactQueryError(error) {
    // Handle React Query specific errors here
    console.error('React Query Error:', error);
}

export { handleError, handleReactQueryError }