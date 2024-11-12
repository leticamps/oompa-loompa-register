import { useMemo } from 'react'
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const FilteredList = ({ workerList, filterKey }) => {
    const filteredList = useMemo(() => {
        if (!isEmpty(workerList) && filterKey !== '') {
            return workerList.reduce((prev, current) => {
                if (current.first_name.toLowerCase().search(filterKey) !== -1
                    || current.last_name.toLowerCase().search(filterKey) !== -1
                    || current.profession.toLowerCase().search(filterKey) !== -1
                ) {
                    prev = [...prev, current];
                }

                return prev;
            }, []);
        }

        return workerList;
    }, [workerList, filterKey]);

    return isEmpty(filteredList)
        ? (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "300px",
                    justifyContent: "center",
                }}>
                <div style={{ padding: '16px', display: 'grid', justifyItems: 'center' }}>
                    <img
                        src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
                        alt="oompa loompa image"
                        width="48px"
                        height="48px"
                        style={{ marginBottom: "16px", opacity: "0.3" }}
                    />
                    <h3 style={{ color: "silver" }}>
                        {'There are no elements to show'}
                    </h3>
                    <span style={{ color: "silver" }}>
                        {'Try changing the search term'}
                    </span>
                </div>
            </div>
        ) : (
            <ol style={{ display: 'flex', flexWrap: "wrap", justifyContent: "space-between", padding: "0 126px" }}>
                {filteredList.map((oompaLoompa, index) => (
                    <li
                        key={index}
                        style={{ display: 'flex', flexDirection: 'column', marginBottom: "70px", padding: "16px" }}
                    >
                        <img
                            src={oompaLoompa.image}
                            alt="oompa loompa image"
                            style={{
                                width: "340px",
                                height: "240px",
                                objectFit: "cover",
                                marginBottom: "32px"
                            }}
                        />
                        <Link to={`/${oompaLoompa.id}`} style={{ textDecoration: "inherit" }}>
                            <b style={{ fontSize: "24px" }}>
                                {`${oompaLoompa.first_name} ${oompaLoompa.last_name}`}
                            </b>
                        </Link>
                        <span style={{ color: "grey" }}>
                            {oompaLoompa.gender === 'F' ? 'Woman' : 'Man'}
                        </span>
                        <i style={{ color: "grey" }}>
                            {oompaLoompa.profession}
                        </i>
                    </li>
                ))}
            </ol>
        )
}

export default FilteredList;