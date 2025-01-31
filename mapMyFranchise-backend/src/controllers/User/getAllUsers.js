module.exports = function makeGetAllUsersAction ({getAllUsers, formatResponse, formatError}){
  return async function getAllUsersAction (httpRequest){
    try{
      const result = await getAllUsers({
        queryParameters: httpRequest.query,
        userProfile: httpRequest.user,
      });
      return formatResponse({statusCode: 200, body: result});
    } catch (e) {
      return formatError({error: e});
    }
  }
}