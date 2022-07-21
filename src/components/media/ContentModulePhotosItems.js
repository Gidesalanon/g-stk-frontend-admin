import React, { useEffect, useState } from 'react'
import Gallery, { propTypes } from 'react-grid-gallery';
import { getEntity } from '../../service/api';
import { useParams } from 'react-router';
import ContentLoader from 'react-content-loader'
import { Badge, Col } from 'reactstrap';
import Spinner from '../spinner/spinner';

const directory = process.env.REACT_APP_SERVER_ASSET

export default function ContentModulePhotosItems({module,renderActions}) {

    const [currentPage, setCurrentPage] = useState(1)
    const [numberPage, setNumberPage] = useState([])
    const [mediaPhotos, setModulePhotos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        getEntity(`medias_all?module_id=${module.id}&page=${currentPage}`).then(res => {
            setModulePhotos(res.data.data);
            setLoading(false)
            let array_pages = Math.ceil(parseInt(res.data.total) / parseInt(res.data.per_page))
            array_pages = Array.from(Array(array_pages).keys())
            setNumberPage(array_pages);
        })
    }, [currentPage,module])
    return (
            <div className="container content-mediatheque-items">

                <div className="row">
                    <div className="col-12 mt-10 p-0">
                        {loading&&<Spinner/>}
        <div className="grid-hover">                
                    {mediaPhotos.length > 0 ? 
    mediaPhotos.map((item, key) => {
        return (
                <Col md="6" sm="6" xs="12" className="my-2 p-0" key={key} id={'media-'+key}>
                    <figure className="effect-zoe" >
                        <img  src={process.env.REACT_APP_SERVER_ASSET+item.fichier.filename} alt="description" />
                        <figcaption>
                            <div>
                                <p className="icon-links">
                                <Badge className="bg-info">
                                    {item.modules?.name}
                                </Badge>{"   "}
                                {renderActions(item)}
                                </p>
                                <p className="description">{item.title||''}</p>
                            </div>
                        </figcaption>
                    </figure>
                </Col>
            
        );
    })
    
     : !loading&&<h3> Pas de medias </h3>}
        </div>
                    </div>
                </div>
                {numberPage > 1 &&<div className="row">
                    <div className="col-lg-12">
                        <nav className="courses-pagination mt-50 pb-3">
                            <ul className="pagination justify-content-center">
                                <li className="page-item cursor">
                                    <a onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} aria-label="Précédent" >
                                        <i className="fa fa-angle-left"></i>
                                    </a>
                                </li>
                                {
                                    numberPage.map((n) => (
                                        <li key={`page${n + 1}`} className="page-item cursor"><a className={currentPage == (n + 1) && 'active'} onClick={() => setCurrentPage(n + 1)}>{n + 1}</a></li>
                                    ))
                                }
                                <li className="page-item cursor">
                                    <a onClick={() => currentPage < numberPage.length && setCurrentPage(currentPage + 1)} aria-label="Suivant">
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>}
            </div>
    )
}
