import React, { Component } from 'react';
import "../assets/scss/empty-list.scss";
import emptyIMG from '../assets/img/empty_file.jpg';

class EmptyList extends Component {
    
    render() {
        return (
			<div className="col-12 empty-list">
                <svg className="empty" viewBox="656 573 264 182" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<polygon id="eptech" className="plus" stroke="none" fill="#7DBFEB" fillRule="evenodd" points="689.681239 597.614697 689.681239 596 690.771974 596 690.771974 597.614697 692.408077 597.614697 692.408077 598.691161 690.771974 598.691161 690.771974 600.350404 689.681239 600.350404 689.681239 598.691161 688 598.691161 688 597.614697"></polygon>
					<polygon id="solutech" className="plus" stroke="none" fill="#EEE332" fillRule="evenodd" points="913.288398 701.226961 913.288398 699 914.773039 699 914.773039 701.226961 917 701.226961 917 702.711602 914.773039 702.711602 914.773039 705 913.288398 705 913.288398 702.711602 911 702.711602 911 701.226961"></polygon>
					<polygon id="judicaelbdimon" className="plus" stroke="none" fill="#40A44E" fillRule="evenodd" points="662.288398 736.226961 662.288398 734 663.773039 734 663.773039 736.226961 666 736.226961 666 737.711602 663.773039 737.711602 663.773039 740 662.288398 740 662.288398 737.711602 660 737.711602 660 736.226961"></polygon>
					<circle className="oval" stroke="none" fill="#A5D6D3" fillRule="evenodd" cx="699.5" cy="579.5" r="1.5"></circle>
					<circle className="oval" stroke="none" fill="#CFC94E" fillRule="evenodd" cx="712.5" cy="617.5" r="1.5"></circle>
					<circle className="oval" stroke="none" fill="#8CC8C8" fillRule="evenodd" cx="692.5" cy="738.5" r="1.5"></circle>
					<circle className="oval" stroke="none" fill="#3EC08D" fillRule="evenodd" cx="884.5" cy="657.5" r="1.5"></circle>
					<circle className="oval" stroke="none" fill="#66739F" fillRule="evenodd" cx="918.5" cy="681.5" r="1.5"></circle>
					<circle className="oval" stroke="none" fill="#C48C47" fillRule="evenodd" cx="903.5" cy="723.5" r="1.5"></circle>
					<circle className="oval" stroke="none" fill="#A24C65" fillRule="evenodd" cx="760.5" cy="587.5" r="1.5"></circle>
					<circle className="oval" stroke="#66739F" strokeWidth="2" fill="none" cx="745" cy="603" r="3"></circle>
					<circle className="oval" stroke="#EFB549" strokeWidth="2" fill="none" cx="716" cy="597" r="3"></circle>
					<circle className="oval" stroke="#00ff00" strokeWidth="2" fill="none" cx="681" cy="751" r="3"></circle>
					<circle className="oval" stroke="#3CBC83" strokeWidth="2" fill="none" cx="896" cy="680" r="3"></circle>
					<polygon id="diamond" stroke="#C46F82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" points="886 705 889 708 886 711 883 708"></polygon>
					<path d="M736,577 C737.65825,577 739,578.34175 739,580 C739,578.34175 740.34175,577 742,577 C740.34175,577 739,575.65825 739,574 C739,575.65825 737.65825,577 736,577 Z" id="bubble-rounded" stroke="#3CBC83" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
				</svg>
				<img src={emptyIMG} className="empty-img" alt="empty ressorces" />
				<h4>{this.props.title||'Désolé le contenu que vous recherchez est introuvable'}</h4>
			</div>
        );
    }
}

export default EmptyList;