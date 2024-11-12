import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Header from "./Header";
import { getWorkersDetails } from "../store/getDetailsReducer";

const Details = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.workerDetails);

    useEffect(() => {
        if (
            isEmpty(data)
            || isEmpty(data[id])
            || (Date.parse(new Date()) >= data[id].expiresIn)
        ) {
            dispatch(getWorkersDetails(id));
        }
    }, []);

    return (
        <>
            <Header redirect />
            {data[id] && (
                <div style={{ display: "flex", flexDirection: "row", padding: "100px 142px" }}>
                    <img
                        src={data[id].data.image}
                        alt="oompa loompa details image"
                        width="800"
                        height="600"
                        style={{ height: "100%", maxWidth: "800px", width: "100%", minWidth: "300px" }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "32px",
                            minWidth: "300px",
                            maxWidth: "600px"
                        }}>
                        <b style={{ fontSize: "24px" }}>
                            {`${data[id].data.first_name} ${data[id].data.last_name}`}
                        </b>
                        <span style={{ color: "grey" }}>
                            {data[id].data.gender === 'F' ? 'Woman' : 'Man'}
                        </span>
                        <i style={{ color: "grey", marginBottom: "16px" }}>
                            {data[id].data.profession}
                        </i>
                        <div>
                            {parse(data[id].data.description)}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Details;