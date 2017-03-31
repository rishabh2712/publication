export const CURRENT_ROUTE="CURRENT_ROUTE";
export const INVALIDATE_ROUTE="INVALIDATE_ROUTE";



export function currentRoute(route){
  return{
  type:CURRENT_ROUTE,
  route
};
}

export function invalidateRoute(){
  return{
  type: INVALIDATE_ROUTE,
 }
}
