import React from "react";
import { useHistory } from 'react-router-dom';
import { Col, Card, CardBody, CardHeader, Input } from "reactstrap";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const history = useHistory();
    const onSubmit = (e) => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    };

    return (
        <form
            className="col-12"
            action="/iconographie"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <Card className="gradient-purple-bliss white text-center p-4">
                <CardHeader className="p-0">
                    {/* <h1>Trouvez ci-dessous comment utiliser cette application !</h1> */}
                    <p className="white">
                    <em>Si vous avez une péocupation particulière, vous pouvez filtrer la liste suivant des mots clés.</em>
                    </p>
                </CardHeader>
                <CardBody className="p-0">
                    <Col xs="12" className="form-group">
                    <Input 
                        className="form-control"value={searchQuery}
                        onInput={(e) => setSearchQuery(e.target.value)}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        id="header-search"
                        name="s" placeholder="Rechercher..."
                    />
                    </Col>
                </CardBody>
            </Card>
        </form>
    );
};

export default SearchBar;
