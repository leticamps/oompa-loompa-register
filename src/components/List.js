import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash';

import FilteredList from './FilteredList';
import { getWorkersList } from '../store/getListReducer';
import { resetExpirationTime } from '../store/updateExpirationTime';
import Header from './Header';

const List = () => {
    const dispatch = useDispatch();

    const { results, nextPage, isLoading, current } = useSelector((state) => state.workerList);
    const { expiresIn } = useSelector((state) => state.expirationTime);

    const [searchItem, setSearchItem] = useState('');

    useEffect(() => {
        if (isEmpty(results) || Date.parse(new Date()) >= expiresIn) {
            dispatch(getWorkersList(1));
            dispatch(resetExpirationTime());
        }
    }, []);

    const handleScroll = useCallback(() => {
        if (
            results
            && window.innerHeight + window.scrollY >= document.body.scrollHeight - 200
            && !isLoading
            && nextPage >= current
        ) {
            dispatch(getWorkersList(nextPage));
        }
    }, [results, isLoading, nextPage, current, dispatch]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, handleScroll]);

    const handleInputChange = (event) => {
        setSearchItem(event.target.value);
    }

    return (
        <>
            <Header />
            <div style={{ padding: "0 142px", display: "grid" }}>
                <div
                    style={{
                        display: "flex",
                        justifySelf: "flex-end",
                        backgroundColor: "white",
                        border: "1px solid dimgrey",
                        borderRadius: "8px",
                        alignItems: "center",
                        marginTop: "16px",
                        padding: "8px"
                    }}>
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchItem}
                        onChange={handleInputChange}
                        style={{ border: "none", borderRight: "1px solid dimgrey", outline: "none" }}
                    />
                    <img
                        src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"
                        alt="search image"
                        width="16px"
                        height="16px"
                        style={{ marginLeft: "8px" }}
                    />
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: 'normal', marginBottom: 0, fontSize: "40px" }}>
                    {'Find your Oompa Loompa'}
                </h1>
                <h2 style={{ color: "dimgrey", fontWeight: 'normal', marginTop: 0, fontSize: "30px" }}>
                    {'There are more than 100k'}
                </h2>
            </div>
                <FilteredList workerList={results} filterKey={searchItem} />
        </>
    )
}

export default List;