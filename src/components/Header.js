import { Link } from "react-router-dom";

const Header = ({ redirect }) => (
    <Link to={redirect && '/'} style={{ textDecoration: "inherit", color: "inherit" }}>
        <header style={{ backgroundColor: '#D8D8D8', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "32px", padding: "16px" }}>
            <img
                src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
                alt="oompa loompa image"
                width="30px"
                height="30px"
                style={{ marginLeft: "48px" }}
            />
            <b style={{ fontSize: "20px" }}>
                Oompa Loompa&apos;s Crew
            </b>
        </header>
    </Link>
)

export default Header;