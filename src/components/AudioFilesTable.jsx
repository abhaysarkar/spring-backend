


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AudioFilesTable = () => {
//     const [audioFiles, setAudioFiles] = useState([]);

//     useEffect(() => {
//         fetchAudioFiles();
//     }, []);

//     const fetchAudioFiles = () => {
//         axios.get('http://localhost:8080/api/audio-files')
//             .then(response => setAudioFiles(response.data))
//             .catch(error => console.error('Error fetching data: ', error));
//     };

//     const deleteAudioFile = (id) => {
//         const confirmed = window.confirm("Are you sure you want to delete this audio file?");
//         if (confirmed) {
//             axios.delete(`http://localhost:8080/api/audio-files/${id}`)
//                 .then(() => {
//                     setAudioFiles(audioFiles.filter(file => file.id !== id));
//                 })
//                 .catch(error => console.error('Error deleting file: ', error));
//         }
//     };

//     return (
//         <div className="container-fluid mt-5">
//             <h1 className="mb-4">Audio Files</h1>
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Gender</th>
//                         <th>Medical Field</th>
//                         <th>Sub-Department</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Audio File</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {audioFiles.map(file => (
//                         <tr key={file.id}>
//                             <td>{file.id}</td>
//                             <td>{file.name}</td>
//                             <td>{file.email}</td>
//                             <td>{file.gender}</td>
//                             <td>{file.medicalField}</td>
//                             <td>{file.subDepartment}</td>
//                             <td>{file.city}</td>
//                             <td>{file.state}</td>
//                             <td><audio controls src={file.fileUrl} /></td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => deleteAudioFile(file.id)}>
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AudioFilesTable;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';

// const AudioFilesTable = () => {
//     const [audioFiles, setAudioFiles] = useState([]);
//     const [showDialog, setShowDialog] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [description, setDescription] = useState('');
//     const [approvedFiles, setApprovedFiles] = useState(new Set());

//     useEffect(() => {
//         fetchAudioFiles();
//     }, []);

//     const fetchAudioFiles = () => {
//         axios.get('http://localhost:8080/api/audio-files')
//             .then(response => setAudioFiles(response.data))
//             .catch(error => console.error('Error fetching data: ', error));
//     };

//     const deleteAudioFile = (id) => {
//         const confirmed = window.confirm("Are you sure you want to delete this audio file?");
//         if (confirmed) {
//             axios.delete(`http://localhost:8080/api/audio-files/${id}`)
//                 .then(() => {
//                     setAudioFiles(audioFiles.filter(file => file.id !== id));
//                 })
//                 .catch(error => console.error('Error deleting file: ', error));
//         }
//     };

//     const fetchDescription = (subDepartmentName) => {
//         axios.get(`http://localhost:8080/api/sub-departments/description/${subDepartmentName}`)
//             .then(response => setDescription(response.data))
//             .catch(error => console.error('Error fetching description: ', error));
//     };

//     const handleApproveClick = (file) => {
//         setSelectedFile(file);
//         fetchDescription(file.subDepartment);
//         setShowDialog(true);
//     };

//     const handleApprove = () => {
//         setApprovedFiles(prev => new Set(prev).add(selectedFile.id));
//         setShowDialog(false);


//     };

//     const handleCloseDialog = () => {
//         setShowDialog(false);
//     };

//     return (
//         <div className="container-fluid mt-5">
//             <h1 className="mb-4">Audio Files</h1>
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Gender</th>
//                         <th>Medical Field</th>
//                         <th>Sub-Department</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Audio File</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {audioFiles.map(file => (
//                         <tr key={file.id}>
//                             <td>{file.id}</td>
//                             <td>{file.name}</td>
//                             <td>{file.email}</td>
//                             <td>{file.gender}</td>
//                             <td>{file.medicalField}</td>
//                             <td>{file.subDepartment}</td>
//                             <td>{file.city}</td>
//                             <td>{file.state}</td>
//                             <td><audio controls src={file.fileUrl} /></td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => deleteAudioFile(file.id)}>
//                                     Delete
//                                 </button>
//                                 <button
//                                     className={`btn ${approvedFiles.has(file.id) ? 'btn-success' : 'btn-primary'}`}
//                                     onClick={() => handleApproveClick(file)}
//                                 >
//                                     {approvedFiles.has(file.id) ? 'Approved' : 'Approve'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedFile && (
//                 <Modal show={showDialog} onHide={handleCloseDialog}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Approve Audio File</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <audio controls src={selectedFile.fileUrl} style={{ width: '100%' }} />
//                         <div className="mt-3">
//                             <textarea
//                                 className="form-control"
//                                 rows="3"
//                                 value={description}
//                                 readOnly
//                             />
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseDialog}>
//                             Exit
//                         </Button>
//                         <Button variant="success" onClick={handleApprove}>
//                             Approve It
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default AudioFilesTable;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';

// const AudioFilesTable = () => {
//     const [audioFiles, setAudioFiles] = useState([]);
//     const [showDialog, setShowDialog] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [description, setDescription] = useState('');

//     useEffect(() => {
//         fetchAudioFiles();
//     }, []);

//     const fetchAudioFiles = () => {
//         axios.get('http://localhost:8080/api/audio-files')
//             .then(response => setAudioFiles(response.data))
//             .catch(error => console.error('Error fetching data: ', error));
//     };

//     const deleteAudioFile = (id) => {
//         const confirmed = window.confirm("Are you sure you want to delete this audio file?");
//         if (confirmed) {
//             axios.delete(`http://localhost:8080/api/audio-files/${id}`)
//                 .then(() => {
//                     setAudioFiles(audioFiles.filter(file => file.id !== id));
//                 })
//                 .catch(error => console.error('Error deleting file: ', error));
//         }
//     };

//     const fetchDescription = (subDepartmentName) => {
//         axios.get(`http://localhost:8080/api/sub-departments/description/${subDepartmentName}`)
//             .then(response => setDescription(response.data))
//             .catch(error => console.error('Error fetching description: ', error));
//     };

//     const handleApproveClick = (file) => {
//         setSelectedFile(file);
//         fetchDescription(file.subDepartment);
//         setShowDialog(true);
//     };

    

//     const handleCloseDialog = () => {
//         setShowDialog(false);
//     };


//     const handleApprove = async () => {

//         //const newAudioFile = {...selectedFile, flag: true};

//         const { id, email, medicalField, subDepartment, fileName="audio.wav", fileUrl} = selectedFile;
//         const newAudioFile = {id, email, medicalField, subDepartment, fileName, fileUrl};

//         const brandNew = {...newAudioFile, flag:true};

        
//         console.log(brandNew)
//         try {
          
      
          
//           const response = await axios.post('http://localhost:8080/api/audio-files/update-for-approve', brandNew, {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
      
//           console.log('Response:', response.data);
//           // Assuming setAudioUrl is defined somewhere in your code to handle the response data
//           //setAudioUrl(response.data);
//         } catch (error) {
//           console.error('Error Approving audio file:', error);
//         }
//     };


//     //console.log(selectedFile);

//     return (
//         <div className="container-fluid mt-5">
//             <h1 className="mb-4">Audio Files</h1>
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Gender</th>
//                         <th>Medical Field</th>
//                         <th>Sub-Department</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Audio File</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {audioFiles.map(file => (
//                         <tr key={file.id}>
//                             <td>{file.id}</td>
//                             <td>{file.name}</td>
//                             <td>{file.email}</td>
//                             <td>{file.gender}</td>
//                             <td>{file.medicalField}</td>
//                             <td>{file.subDepartment}</td>
//                             <td>{file.city}</td>
//                             <td>{file.state}</td>
//                             <td><audio controls src={file.fileUrl} /></td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => deleteAudioFile(file.id)}>
//                                     Delete
//                                 </button>
//                                 <button
//                                     className={`btn ${file.flag ? 'btn-success' : 'btn-primary'}`}
//                                     onClick={() => handleApproveClick(file)}
//                                 >
//                                     {file.flag ? 'Approved' : 'Approve'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedFile && (
//                 <Modal show={showDialog} onHide={handleCloseDialog}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Approve Audio File</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <audio controls src={selectedFile.fileUrl} style={{ width: '100%' }} />
//                         <div className="mt-3">
//                             <textarea
//                                 className="form-control"
//                                 rows="3"
//                                 value={description}
//                                 readOnly
//                             />
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseDialog}>
//                             Exit
//                         </Button>
//                         <Button variant="success" onClick={handleApprove}>
//                             Approve It
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default AudioFilesTable;








////below code is working
///////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';

// const AudioFilesTable = () => {
//     const [audioFiles, setAudioFiles] = useState([]);
//     const [showDialog, setShowDialog] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [description, setDescription] = useState('');

//     useEffect(() => {
//         fetchAudioFiles();
//     }, []);

//     const fetchAudioFiles = () => {
//         axios.get('http://localhost:8080/api/audio-files')
//             .then(response => setAudioFiles(response.data))
//             .catch(error => console.error('Error fetching data: ', error));
//     };

//     const deleteAudioFile = (id) => {
//         const confirmed = window.confirm("Are you sure you want to delete this audio file?");
//         if (confirmed) {
//             axios.delete(`http://localhost:8080/api/audio-files/${id}`)
//                 .then(() => {
//                     setAudioFiles(audioFiles.filter(file => file.id !== id));
//                 })
//                 .catch(error => console.error('Error deleting file: ', error));
//         }
//     };

//     const fetchDescription = (subDepartmentName) => {
//         axios.get(`http://localhost:8080/api/sub-departments/description/${subDepartmentName}`)
//             .then(response => setDescription(response.data))
//             .catch(error => console.error('Error fetching description: ', error));
//     };

//     const handleApproveClick = (file) => {
//         setSelectedFile(file);
//         fetchDescription(file.subDepartment);
//         setShowDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setShowDialog(false);
//     };

//     const handleApprove = async () => {
//         const { id, email, medicalField, subDepartment, fileName="audio.wav", fileUrl } = selectedFile;
//         const newAudioFile = { id, email, medicalField, subDepartment, fileName, fileUrl, flag: true };

//         try {
//             const response = await axios.post('http://localhost:8080/api/audio-files/update-for-approve', newAudioFile, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             console.log('Response:', response.data);
//             // Update the local state with the approved file
//             setAudioFiles(audioFiles.map(file => (file.id === id ? { ...file, flag: true } : file)));
//             setShowDialog(false);
//         } catch (error) {
//             console.error('Error approving audio file:', error);
//         }
//     };

//     return (
//         <div className="container-fluid mt-5">
//             <h1 className="mb-4">Audio Files</h1>
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Medical Field</th>
//                         <th>Sub-Department</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Audio File</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {audioFiles.map(file => (
//                         <tr key={file.id}>
//                             <td>{file.id}</td>
//                             <td>{file.name}</td>
//                             <td>{file.email}</td>
//                             <td>{file.age}</td>
//                             <td>{file.gender}</td>
//                             <td>{file.medicalField}</td>
//                             <td>{file.subDepartment}</td>
//                             <td>{file.city}</td>
//                             <td>{file.state}</td>
//                             <td><audio controls src={file.fileUrl} /></td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => deleteAudioFile(file.id)}>
//                                     Delete
//                                 </button>
//                                 <button
//                                     className={`btn ${file.flag ? 'btn-success' : 'btn-primary'}`}
//                                     onClick={() => !file.flag && handleApproveClick(file)}
//                                     disabled={file.flag}
//                                 >
//                                     {file.flag ? 'Approved' : 'Approve'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedFile && (
//                 <Modal show={showDialog} onHide={handleCloseDialog}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Approve Audio File</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <audio controls src={selectedFile.fileUrl} style={{ width: '100%' }} />
//                         <div className="mt-3">
//                             <textarea
//                                 className="form-control"
//                                 rows="3"
//                                 value={description}
//                                 readOnly
//                             />
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseDialog}>
//                             Exit
//                         </Button>
//                         <Button variant="success" onClick={handleApprove}>
//                             Approve It
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default AudioFilesTable;














// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';

// const AudioFilesTable = () => {
//     const [audioFiles, setAudioFiles] = useState([]);
//     const [filteredFiles, setFilteredFiles] = useState([]);
//     const [showDialog, setShowDialog] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [description, setDescription] = useState('');
//     const [searchValues, setSearchValues] = useState({
//         name: '',
//         email: '',
//         age: '',
//         gender: '',
//         medicalField: ''
//     });

//     useEffect(() => {
//         fetchAudioFiles();
//     }, []);

//     useEffect(() => {
//         filterAudioFiles();
//     }, [searchValues, audioFiles]);

//     const fetchAudioFiles = () => {
//         axios.get('http://localhost:8080/api/audio-files')
//             .then(response => {
//                 setAudioFiles(response.data);
//                 setFilteredFiles(response.data);
//             })
//             .catch(error => console.error('Error fetching data: ', error));
//     };

//     const deleteAudioFile = (id) => {
//         const confirmed = window.confirm("Are you sure you want to delete this audio file?");
//         if (confirmed) {
//             axios.delete(`http://localhost:8080/api/audio-files/${id}`)
//                 .then(() => {
//                     setAudioFiles(audioFiles.filter(file => file.id !== id));
//                 })
//                 .catch(error => console.error('Error deleting file: ', error));
//         }
//     };

//     const fetchDescription = (subDepartmentName) => {
//         axios.get(`http://localhost:8080/api/sub-departments/description/${subDepartmentName}`)
//             .then(response => setDescription(response.data))
//             .catch(error => console.error('Error fetching description: ', error));
//     };

//     const handleApproveClick = (file) => {
//         setSelectedFile(file);
//         fetchDescription(file.subDepartment);
//         setShowDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setShowDialog(false);
//     };

//     const handleApprove = async () => {
//         const { id, email, medicalField, subDepartment, fileName = "audio.wav", fileUrl } = selectedFile;
//         const newAudioFile = { id, email, medicalField, subDepartment, fileName, fileUrl, flag: true };

//         try {
//             const response = await axios.post('http://localhost:8080/api/audio-files/update-for-approve', newAudioFile, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             console.log('Response:', response.data);
//             // Update the local state with the approved file
//             setAudioFiles(audioFiles.map(file => (file.id === id ? { ...file, flag: true } : file)));
//             setShowDialog(false);
//         } catch (error) {
//             console.error('Error approving audio file:', error);
//         }
//     };

//     const handleSearchChange = (e) => {
//         const { name, value } = e.target;
//         setSearchValues({
//             ...searchValues,
//             [name]: value
//         });
//     };

//     const filterAudioFiles = () => {
//         let filtered = audioFiles.filter(file => {
//             return (
//                 (searchValues.name === '' || file.name.toLowerCase().includes(searchValues.name.toLowerCase())) &&
//                 (searchValues.email === '' || file.email.toLowerCase().includes(searchValues.email.toLowerCase())) &&
//                 (searchValues.age === '' || file.age === parseInt(searchValues.age)) &&
//                 (searchValues.gender === '' || file.gender.toLowerCase().includes(searchValues.gender.toLowerCase())) &&
//                 (searchValues.medicalField === '' || file.medicalField.toLowerCase().includes(searchValues.medicalField.toLowerCase()))
//             );
//         });
//         setFilteredFiles(filtered);
//     };

//     return (
//         <div className="container-fluid mt-5">
//             <h1 className="mb-4">Audio Files</h1>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     placeholder="Search by Name"
//                     name="name"
//                     value={searchValues.name}
//                     onChange={handleSearchChange}
//                     className="form-control"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by Email"
//                     name="email"
//                     value={searchValues.email}
//                     onChange={handleSearchChange}
//                     className="form-control"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Search by Age"
//                     name="age"
//                     value={searchValues.age}
//                     onChange={handleSearchChange}
//                     className="form-control"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by Gender"
//                     name="gender"
//                     value={searchValues.gender}
//                     onChange={handleSearchChange}
//                     className="form-control"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by Medical Field"
//                     name="medicalField"
//                     value={searchValues.medicalField}
//                     onChange={handleSearchChange}
//                     className="form-control"
//                 />
//             </div>

//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Medical Field</th>
//                         <th>Sub-Department</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Audio File</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredFiles.map(file => (
//                         <tr key={file.id}>
//                             <td>{file.id}</td>
//                             <td>{file.name}</td>
//                             <td>{file.email}</td>
//                             <td>{file.age}</td>
//                             <td>{file.gender}</td>
//                             <td>{file.medicalField}</td>
//                             <td>{file.subDepartment}</td>
//                             <td>{file.city}</td>
//                             <td>{file.state}</td>
//                             <td><audio controls src={file.fileUrl} /></td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => deleteAudioFile(file.id)}>
//                                     Delete
//                                 </button>
//                                 <button
//                                     className={`btn ${file.flag ? 'btn-success' : 'btn-primary'}`}
//                                     onClick={() => !file.flag && handleApproveClick(file)}
//                                     disabled={file.flag}
//                                 >
//                                     {file.flag ? 'Approved' : 'Approve'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedFile && (
//                 <Modal show={showDialog} onHide={handleCloseDialog}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Approve Audio File</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <audio controls src={selectedFile.fileUrl} style={{ width: '100%' }} />
//                         <div className="mt-3">
//                             <textarea
//                                 className="form-control"
//                                 rows="3"
//                                 value={description}
//                                 readOnly
//                             />
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseDialog}>
//                             Exit
//                         </Button>
//                         <Button variant="success" onClick={handleApprove}>
//                             Approve It
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default AudioFilesTable;











///below code is working code

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';

// const AudioFilesTable = () => {
//     const [audioFiles, setAudioFiles] = useState([]);
//     const [filteredFiles, setFilteredFiles] = useState([]);
//     const [showDialog, setShowDialog] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [description, setDescription] = useState('');
//     const [searchValues, setSearchValues] = useState({
//         name: '',
//         email: '',
//         age: '',
//         gender: '',
//         medicalField: ''
//     });

//     useEffect(() => {
//         fetchAudioFiles();
//     }, []);

//     useEffect(() => {
//         filterAudioFiles();
//     }, [searchValues, audioFiles]);

//     const fetchAudioFiles = () => {
//         axios.get('http://localhost:8080/api/audio-files')
//             .then(response => {
//                 setAudioFiles(response.data);
//                 setFilteredFiles(response.data);
//             })
//             .catch(error => console.error('Error fetching data: ', error));
//     };

//     const deleteAudioFile = (id) => {
//         const confirmed = window.confirm("Are you sure you want to delete this audio file?");
//         if (confirmed) {
//             axios.delete(`http://localhost:8080/api/audio-files/${id}`)
//                 .then(() => {
//                     setAudioFiles(audioFiles.filter(file => file.id !== id));
//                 })
//                 .catch(error => console.error('Error deleting file: ', error));
//         }
//     };

//     const fetchDescription = (subDepartmentName) => {
//         axios.get(`http://localhost:8080/api/sub-departments/description/${subDepartmentName}`)
//             .then(response => setDescription(response.data))
//             .catch(error => console.error('Error fetching description: ', error));
//     };

//     const handleApproveClick = (file) => {
//         setSelectedFile(file);
//         fetchDescription(file.subDepartment);
//         setShowDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setShowDialog(false);
//     };

//     const handleApprove = async () => {
//         const { id, email, medicalField, subDepartment, fileName = "audio.wav", fileUrl } = selectedFile;
//         const newAudioFile = { id, email, medicalField, subDepartment, fileName, fileUrl, flag: true };

//         try {
//             const response = await axios.post('http://localhost:8080/api/audio-files/update-for-approve', newAudioFile, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             console.log('Response:', response.data);
//             // Update the local state with the approved file
//             setAudioFiles(audioFiles.map(file => (file.id === id ? { ...file, flag: true } : file)));
//             setShowDialog(false);
//         } catch (error) {
//             console.error('Error approving audio file:', error);
//         }
//     };

//     const handleSearchChange = (e) => {
//         const { name, value } = e.target;
//         setSearchValues({
//             ...searchValues,
//             [name]: value
//         });
//     };

//     const filterAudioFiles = () => {
//         let filtered = audioFiles.filter(file => {
//             return (
//                 (searchValues.name === '' || file.name.toLowerCase().includes(searchValues.name.toLowerCase())) &&
//                 (searchValues.email === '' || file.email.toLowerCase().includes(searchValues.email.toLowerCase())) &&
//                 (searchValues.age === '' || file.age === parseInt(searchValues.age)) &&
//                 (searchValues.gender === '' || file.gender.toLowerCase().includes(searchValues.gender.toLowerCase())) &&
//                 (searchValues.medicalField === '' || file.medicalField.toLowerCase().includes(searchValues.medicalField.toLowerCase()))
//             );
//         });
//         setFilteredFiles(filtered);
//     };

//     return (
//         <div className="container-fluid mt-5">
//             <h1 className="mb-4">Audio Files</h1>

//             <div className="row mb-3">
//                 <div className="col">
//                     <input
//                         type="text"
//                         placeholder="Search by Name"
//                         name="name"
//                         value={searchValues.name}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col">
//                     <input
//                         type="text"
//                         placeholder="Search by Email"
//                         name="email"
//                         value={searchValues.email}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col">
//                     <input
//                         type="number"
//                         placeholder="Search by Age"
//                         name="age"
//                         value={searchValues.age}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col">
//                     <input
//                         type="text"
//                         placeholder="Search by Gender"
//                         name="gender"
//                         value={searchValues.gender}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col">
//                     <input
//                         type="text"
//                         placeholder="Search by Medical Field"
//                         name="medicalField"
//                         value={searchValues.medicalField}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//             </div>

//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Medical Field</th>
//                         <th>Sub-Department</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Audio File</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredFiles.map(file => (
//                         <tr key={file.id}>
//                             <td>{file.id}</td>
//                             <td>{file.name}</td>
//                             <td>{file.email}</td>
//                             <td>{file.age}</td>
//                             <td>{file.gender}</td>
//                             <td>{file.medicalField}</td>
//                             <td>{file.subDepartment}</td>
//                             <td>{file.city}</td>
//                             <td>{file.state}</td>
//                             <td><audio controls src={file.fileUrl} /></td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => deleteAudioFile(file.id)}>
//                                     Delete
//                                 </button>
//                                 <button
//                                     className={`btn ${file.flag ? 'btn-success' : 'btn-primary'}`}
//                                     onClick={() => !file.flag && handleApproveClick(file)}
//                                     disabled={file.flag}
//                                 >
//                                     {file.flag ? 'Approved' : 'Approve'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedFile && (
//                 <Modal show={showDialog} onHide={handleCloseDialog}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Approve Audio File</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <audio controls src={selectedFile.fileUrl} style={{ width: '100%' }} />
//                         <div className="mt-3">
//                             <textarea
//                                 className="form-control"
//                                 rows="3"
//                                 value={description}
//                                 readOnly
//                             />
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseDialog}>
//                             Exit
//                         </Button>
//                         <Button variant="success" onClick={handleApprove}>
//                             Approve It
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default AudioFilesTable;







//Below is working Code

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';
// import ReactPaginate from 'react-paginate';

// const AudioFilesTable = () => {
//     const [audioFiles, setAudioFiles] = useState([]);
//     const [filteredFiles, setFilteredFiles] = useState([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [pageCount, setPageCount] = useState(0);
//     const [showDialog, setShowDialog] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [description, setDescription] = useState('');
//     const [searchValues, setSearchValues] = useState({
//         name: '',
//         email: '',
//         age: '',
//         gender: '',
//         medicalField: ''
//     });

//     const itemsPerPage = 10;

//     useEffect(() => {
//         fetchAudioFiles();
//     }, []);

//     useEffect(() => {
//         filterAudioFiles();
//     }, [searchValues, audioFiles]);

//     const fetchAudioFiles = () => {
//         axios.get('http://localhost:8080/api/audio-files')
//             .then(response => {
//                 setAudioFiles(response.data);
//                 setFilteredFiles(response.data);
//                 setPageCount(Math.ceil(response.data.length / itemsPerPage));
//             })
//             .catch(error => console.error('Error fetching data: ', error));
//     };

//     const deleteAudioFile = (id) => {
//         const confirmed = window.confirm("Are you sure you want to delete this audio file?");
//         if (confirmed) {
//             axios.delete(`http://localhost:8080/api/audio-files/${id}`)
//                 .then(() => {
//                     setAudioFiles(audioFiles.filter(file => file.id !== id));
//                 })
//                 .catch(error => console.error('Error deleting file: ', error));
//         }
//     };

//     const fetchDescription = (subDepartmentName) => {
//         axios.get(`http://localhost:8080/api/sub-departments/description/${subDepartmentName}`)
//             .then(response => setDescription(response.data))
//             .catch(error => console.error('Error fetching description: ', error));
//     };

//     const handleApproveClick = (file) => {
//         setSelectedFile(file);
//         fetchDescription(file.subDepartment);
//         setShowDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setShowDialog(false);
//     };

//     const handleApprove = async () => {
//         const { id, email, medicalField, subDepartment, fileName = "audio.wav", fileUrl } = selectedFile;
//         const newAudioFile = { id, email, medicalField, subDepartment, fileName, fileUrl, flag: true };

//         try {
//             const response = await axios.post('http://localhost:8080/api/audio-files/update-for-approve', newAudioFile, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             console.log('Response:', response.data);
//             // Update the local state with the approved file
//             setAudioFiles(audioFiles.map(file => (file.id === id ? { ...file, flag: true } : file)));
//             setShowDialog(false);
//         } catch (error) {
//             console.error('Error approving audio file:', error);
//         }
//     };

//     const handleSearchChange = (e) => {
//         const { name, value } = e.target;
//         setSearchValues({
//             ...searchValues,
//             [name]: value
//         });
//     };

//     const filterAudioFiles = () => {
//         let filtered = audioFiles.filter(file => {
//             return (
//                 (searchValues.name === '' || file.name.toLowerCase().includes(searchValues.name.toLowerCase())) &&
//                 (searchValues.email === '' || file.email.toLowerCase().includes(searchValues.email.toLowerCase())) &&
//                 (searchValues.age === '' || file.age === parseInt(searchValues.age)) &&
//                 (searchValues.gender === '' || file.gender.toLowerCase().includes(searchValues.gender.toLowerCase())) &&
//                 (searchValues.medicalField === '' || file.medicalField.toLowerCase().includes(searchValues.medicalField.toLowerCase()))
//             );
//         });
//         setFilteredFiles(filtered);
//         setPageCount(Math.ceil(filtered.length / itemsPerPage));
//     };

//     const handlePageClick = (data) => {
//         setCurrentPage(data.selected);
//     };

//     const displayFiles = filteredFiles.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

//     return (
//         <div className="container-fluid mt-5">
//             <h1 className="mb-4">Audio Files</h1>

//             <div className="row mb-3">
//                 <div className="col">
//                     <input
//                         type="text"
//                         placeholder="Search by Name"
//                         name="name"
//                         value={searchValues.name}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col">
//                     <input
//                         type="text"
//                         placeholder="Search by Email"
//                         name="email"
//                         value={searchValues.email}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col">
//                     <input
//                         type="number"
//                         placeholder="Search by Age"
//                         name="age"
//                         value={searchValues.age}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col">
//                     <input
//                         type="text"
//                         placeholder="Search by Gender"
//                         name="gender"
//                         value={searchValues.gender}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col">
//                     <input
//                         type="text"
//                         placeholder="Search by Medical Field"
//                         name="medicalField"
//                         value={searchValues.medicalField}
//                         onChange={handleSearchChange}
//                         className="form-control"
//                     />
//                 </div>
//             </div>

//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Medical Field</th>
//                         <th>Sub-Department</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Audio File</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {displayFiles.map(file => (
//                         <tr key={file.id}>
//                             <td>{file.id}</td>
//                             <td>{file.name}</td>
//                             <td>{file.email}</td>
//                             <td>{file.age}</td>
//                             <td>{file.gender}</td>
//                             <td>{file.medicalField}</td>
//                             <td>{file.subDepartment}</td>
//                             <td>{file.city}</td>
//                             <td>{file.state}</td>
//                             <td><audio controls src={file.fileUrl} /></td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => deleteAudioFile(file.id)}>
//                                     Delete
//                                 </button>
//                                 <button
//                                     className={`btn ${file.flag ? 'btn-success' : 'btn-primary'}`}
//                                     onClick={() => !file.flag && handleApproveClick(file)}
//                                     disabled={file.flag}
//                                 >
//                                     {file.flag ? 'Approved' : 'Approve'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <ReactPaginate
//                 previousLabel={'previous'}
//                 nextLabel={'next'}
//                 breakLabel={'...'}
//                 breakClassName={'break-me'}
//                 pageCount={pageCount}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={5}
//                 onPageChange={handlePageClick}
//                 containerClassName={'pagination'}
//                 subContainerClassName={'pages pagination'}
//                 activeClassName={'active'}
//             />

//             {selectedFile && (
//                 <Modal show={showDialog} onHide={handleCloseDialog}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Approve Audio File</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <audio controls src={selectedFile.fileUrl} style={{ width: '100%' }} />
//                         <div className="mt-3">
//                             <textarea
//                                 className="form-control"
//                                 rows="3"
//                                 value={description}
//                                 readOnly
//                             />
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseDialog}>
//                             Exit
//                         </Button>
//                         <Button variant="success" onClick={handleApprove}>
//                             Approve It
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default AudioFilesTable;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './AudioFilesTable.css'; // Import your custom CSS file

const AudioFilesTable = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [searchValues, setSearchValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        medicalField: ''
    });

    const itemsPerPage = 10;

    useEffect(() => {
        fetchAudioFiles();
    }, []);

    useEffect(() => {
        filterAudioFiles();
    }, [searchValues, audioFiles]);

    const fetchAudioFiles = () => {
        axios.get('http://localhost:8080/api/audio-files')
            .then(response => {
                setAudioFiles(response.data);
                setFilteredFiles(response.data);
                setPageCount(Math.ceil(response.data.length / itemsPerPage));
            })
            .catch(error => console.error('Error fetching data: ', error));
    };

    const deleteAudioFile = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this audio file?");
        if (confirmed) {
            axios.delete(`http://localhost:8080/api/audio-files/${id}`)
                .then(() => {
                    setAudioFiles(audioFiles.filter(file => file.id !== id));
                })
                .catch(error => console.error('Error deleting file: ', error));
        }
    };

    const fetchDescription = (subDepartmentName) => {
        axios.get(`http://localhost:8080/api/sub-departments/description/${subDepartmentName}`)
            .then(response => setDescription(response.data))
            .catch(error => console.error('Error fetching description: ', error));
    };

    const handleApproveClick = (file) => {
        setSelectedFile(file);
        fetchDescription(file.subDepartment);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleApprove = async () => {
        const { id, email, medicalField, subDepartment, fileName = "audio.wav", fileUrl } = selectedFile;
        const newAudioFile = { id, email, medicalField, subDepartment, fileName, fileUrl, flag: true };


        const confirmed = window.confirm("Are you sure you want to Approve this audio");
        if (confirmed) {

            try {
                const response = await axios.post('http://localhost:8080/api/audio-files/update-for-approve', newAudioFile, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                console.log('Response:', response.data);
                // Update the local state with the approved file
                setAudioFiles(audioFiles.map(file => (file.id === id ? { ...file, flag: true } : file)));
                setShowDialog(false);
            } catch (error) {
                console.error('Error approving audio file:', error);
            }
            
        }
        
        
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchValues({
            ...searchValues,
            [name]: value
        });
    };

    const filterAudioFiles = () => {
        let filtered = audioFiles.filter(file => {
            return (
                (searchValues.name === '' || file.name.toLowerCase().includes(searchValues.name.toLowerCase())) &&
                (searchValues.email === '' || file.email.toLowerCase().includes(searchValues.email.toLowerCase())) &&
                (searchValues.age === '' || file.age === parseInt(searchValues.age)) &&
                (searchValues.gender === '' || file.gender.toLowerCase().includes(searchValues.gender.toLowerCase())) &&
                (searchValues.medicalField === '' || file.medicalField.toLowerCase().includes(searchValues.medicalField.toLowerCase()))
            );
        });
        setFilteredFiles(filtered);
        setPageCount(Math.ceil(filtered.length / itemsPerPage));
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayFiles = filteredFiles.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="container-fluid mt-5">
            <h1 className="mb-4">Audio Files</h1>

            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        name="name"
                        value={searchValues.name}
                        onChange={handleSearchChange}
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        placeholder="Search by Email"
                        name="email"
                        value={searchValues.email}
                        onChange={handleSearchChange}
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        placeholder="Search by Age"
                        name="age"
                        value={searchValues.age}
                        onChange={handleSearchChange}
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        placeholder="Search by Gender"
                        name="gender"
                        value={searchValues.gender}
                        onChange={handleSearchChange}
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        placeholder="Search by Medical Field"
                        name="medicalField"
                        value={searchValues.medicalField}
                        onChange={handleSearchChange}
                        className="form-control"
                    />
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Medical Field</th>
                        <th>Sub-Department</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Audio File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayFiles.map(file => (
                        <tr key={file.id}>
                            <td>{file.id}</td>
                            <td>{file.name}</td>
                            <td>{file.email}</td>
                            <td>{file.age}</td>
                            <td>{file.gender}</td>
                            <td>{file.medicalField}</td>
                            <td>{file.subDepartment}</td>
                            <td>{file.city}</td>
                            <td>{file.state}</td>
                            <td><audio controls src={file.fileUrl} /></td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteAudioFile(file.id)}>
                                    Delete
                                </button>
                                <button
                                    className={`btn ${file.flag ? 'btn-success' : 'btn-primary'}`}
                                    onClick={() => !file.flag && handleApproveClick(file)}
                                    disabled={file.flag}
                                >
                                    {file.flag ? 'Approved' : 'Approve'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
            />

            {selectedFile && (
                <Modal show={showDialog} onHide={handleCloseDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Approve Audio File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <audio controls src={selectedFile.fileUrl} style={{ width: '100%' }} />
                        <div className="mt-3">
                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                readOnly
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDialog}>
                            Exit
                        </Button>
                        <Button variant="success" onClick={handleApprove}>
                            Approve It
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default AudioFilesTable;
