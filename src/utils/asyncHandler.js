const asyncHandler = (requestHandller) => {
    return (req, res, next) => Promise
        .resolve(requestHandller(req, res, next))
        .catch((err) => next(err));
}



export { asyncHandler }