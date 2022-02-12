import { useEffect, useState } from 'react';
import { Container, Table, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PlusLg, PencilSquare, TrashFill } from 'react-bootstrap-icons';

const Home = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    let timeout = null;

    useEffect(() => {
        const fetchData = async () => {
            const filterStr = filter ? '?filter='+filter : '';
            fetch('/users'+filterStr)
            .then(res => res.json())
            .then(res => {
                setData(res);
            })
            .catch(err => console.log(err));
        };
        fetchData();
    }, [filter]);

    const handleFilter = (e) => {
        clearTimeout(timeout);
        const x = e.which || e.keyCode;
        const timer = x === 13 ? 0 : 1000;

        timeout = setTimeout(() => {
            const target = e.target;
            const value = target.value.trim();
            const length = value.length;
            if (length === 0 || length > 2) {
                setFilter(value);
            }
        }, timer);
    };

    const deleteUser = (id) => {
        fetch(`/users/${id}`, {
             method: 'DELETE',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             }
        })
        .then(res => {
            const updatedUsers = [...data].filter(u => u.id !== id);
            setData(updatedUsers);
        })
        .catch(err => console.log(err));
    }

    const tableList = data.map(user => {
        return (
        <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.emailAddress}</td>
            <td>{user.phoneNumber}</td>
            <td>
                <Button color="default" className="btn-edit btn-icon" tag={Link} to={"/" + user.id} title={'Edit '+user.firstName}><PencilSquare /></Button>
                <Button color="default" className="btn-delete btn-icon" onClick={() => deleteUser(user.id)} title={'Delete '+user.firstName}><TrashFill /></Button>
            </td>
        </tr>
        )
    });

    return (
        <Container>
            <div className="pnl">
                <div className="d-flex justify-content-between">
                    <Input type="text" id="filter" name="filter" onKeyUp={handleFilter} placeholder="filter text here ..." />
                    <Button color="success" tag={Link} to={"/new"}><PlusLg /> Add New</Button>
                </div>
                <Table className="table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th><th>Last Name</th><th>Email Address</th><th>Phone Number</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableList}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Home;