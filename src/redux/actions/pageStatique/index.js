import {getEntity} from "../../../service/api"
export const addThematiqueAction = (thematique) => ({
    type: "add-thematique",
    thematique
 })
 
 export const updateThematiqueAction = (thematique) => ({
    type: "update-thematique",
    thematique
 })

 export const currentPageStatiqueAction = (current) => ({
    type: "current-page-statique",
    current
 })
 

 export const deletePageStatiqueAction = (current) => ({
    type: "delete-page-statique",
     current
 })

 export const getThematiquesAction = (thematiques) => ({
    type: "get-thematiques",
    thematiques
 })

 export const errorThematiqueAction = () => ({
    type: "error-load-thematique"
 })

 export const fetchThematiqueAction =(order, current_filter_spec)=>{
    return (dispatch) => {
        const API_URL =   ''
        return getEntity(API_URL).then(res=>{
            dispatch(getThematiquesAction(res.data))
        }).catch(error=>{
            dispatch(errorThematiqueAction())
        })
    }
}
 

 