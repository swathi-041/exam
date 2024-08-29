import { useEffect, useState } from 'react';
import axios from 'axios';

function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await axios.get('https://eduquestt.onrender.com/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        }
        fetchNotifications();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('https://eduquestt.onrender.com/api/notifications/upload', formData);
            const fileUrl = response.data.fileUrl;
            console.log('File uploaded:', fileUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h2>Notifications</h2>
                    <ul>
                        {notifications.map(notification => (
                            <li key={notification._id}>
                                <button onClick={() => setSelectedNotification(notification)}>
                                    {notification.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 2 }}>
                    {selectedNotification && (
                        <div>
                            <h3>{selectedNotification.title}</h3>
                            <p>{selectedNotification.description}</p>
                            {selectedNotification.fileUrl && (
                                <a href={selectedNotification.fileUrl} target="_blank" rel="noopener noreferrer">
                                    View File
                                </a>
                            )}
                        </div>
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    <h3>Upload New Resource</h3>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
}

export default NotificationsPage;
