import { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const UserEdit = (props) => {
    let obj = {firstName: '', lastName: '', emailAddress: '', phoneNumber: ''};
    const [formData, setFormData] = useState(obj);

    const id = props.match.params.id;
    const edit = (id === 'new') ? false : true;

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/users/${id}`)
            .then(res => res.json())
            .then(user => {
                setFormData(user);
            })
            .catch(err => console.log(err));
        }
    }, [id]);

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/users' + (edit ? '/' +formData.id : ''), {
            method: (edit) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(res => {
            props.history.push("/");
        })
        .catch(err => console.log(err));
    }

    const title = edit ? 'Edit '+formData.firstName : 'Add New User';

    return <Container>
        <div className="pnl text-center form-div">
            <div className="hdr d-flex">
                <h3 className="flex-1">{title}</h3>
                <Button color="default" className="btn-close" tag={Link} to="/"></Button>
            </div>
            <Form onSubmit={handleSubmit} className="">
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="emailAddress">Email Address</Label>
                    <Input type="text" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Button color="success" type="submit">Save</Button>
                </FormGroup>
            </Form>
        </div>
    </Container>
}

export default withRouter(UserEdit);