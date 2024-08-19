import { useState } from 'react';
import './PostsPage.css'; // Ensure to create and link this CSS file
 // Ensure to add all images to the assets folder
 import reactImage from '../assets/reactjs.jpg';
 import angularImage from '../assets/angular.png';
 import vueImage from '../assets/vuejs.webp';
 import nodeImage from '../assets/node.png';
    import pythonImage from '../assets/python.png';
    import javaImage from '../assets/java.png';
    import sqlImage from '../assets/sql.webp';
    import csharpImage from '../assets/csharp.webp';

const subjects = [
    {
        id: 'react',
        image:reactImage, // Replace with actual image path
        title: 'ReactJS',
        description: 'React is a JavaScript library for building user interfaces.',
        links: [
            'https://reactjs.org/docs/getting-started.html',
            'https://reactjs.org/community/support.html'
        ]
    },
    {
        id: 'angular',
        image: angularImage,
        title: 'Angular',
        description: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
        links: [
            'https://angular.io/docs',
            'https://angular.io/community'
        ]
    },
    {
        id: 'vue',
        image: vueImage,
        title: 'Vue.js',
        description: 'Vue.js is a progressive framework for building user interfaces.',
        links: [
            'https://vuejs.org/v2/guide/',
            'https://vuejs.org/v2/community/'
        ]
    },
    {
        id: 'node',
        image: nodeImage,
        title: 'Node.js',
        description: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
        links: [
            'https://nodejs.org/en/docs/',
            'https://nodejs.org/en/about/community/'
        ]
    },
    {
        id: 'python',
        image: pythonImage,
        title: 'Python',
        description: 'Python is an interpreted, high-level, general-purpose programming language.',
        links: [
            'https://docs.python.org/3/',
            'https://www.python.org/community/'
        ]
    },
    {
        id: 'java',
        image: javaImage,
        title: 'Java',
        description: 'Java is a high-level, class-based, object-oriented programming language.',
        links: [
            'https://docs.oracle.com/javase/8/docs/',
            'https://www.oracle.com/java/technologies/java-community.html'
        ]
    },
    {
        id: 'sql',
        image: sqlImage,
        title: 'SQL',
        description: 'SQL (Structured Query Language) is a standard language for managing and manipulating databases.',
        links: [
            'https://www.w3schools.com/sql/',
            'https://www.sqlservercentral.com/'
        ]
    },
    {
        id: 'csharp',
        image: csharpImage,
        title: 'C#',
        description: 'C# is a modern, object-oriented programming language developed by Microsoft.',
        links: [
            'https://docs.microsoft.com/en-us/dotnet/csharp/',
            'https://docs.microsoft.com/en-us/dotnet/community/'
        ]
    }
];


export default function PostsPage() {
    const [selectedSubject, setSelectedSubject] = useState(null);

    const handleClick = (subject) => {
        setSelectedSubject(subject);
    };

    const closeModal = () => {
        setSelectedSubject(null);
    };

    return (
        <div className="posts-container">
            <h1>Explore Subjects</h1>
            <div className="subjects-grid">
                {subjects.map((subject) => (
                    <div key={subject.id} className="subject-card" onClick={() => handleClick(subject)}>
                        <img src={subject.image} alt={subject.title} className="subject-image" />
                        <h2>{subject.title}</h2>
                    </div>
                ))}
            </div>

            {selectedSubject && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedSubject.title}</h2>
                        <p>{selectedSubject.description}</p>
                        <ul>
                            {selectedSubject.links.map((link, index) => (
                                <li key={index}>
                                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                </li>
                            ))}
                        </ul>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
