import React, {useEffect, useState} from 'react';
import moment from "moment";
import Link from "next/link";
import {getAllPostsText} from "../services";

const SearchedPost = ({userQuery}) => {
    const [allPostTexts, setAllPostTexts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])


    useEffect(() => {
        getAllPostsText()
            .then((newAllPostsTexts) => setAllPostTexts(newAllPostsTexts))
    }, [userQuery])

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8' >
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Колличество постов {allPostTexts.filter((value) => {
                if(value.title.toLowerCase().includes(userQuery.toLowerCase())){
                    return value
                } else if(value.content.text.toLowerCase().includes(userQuery.toLowerCase())) {
                    return value
                } else {
                    return ''
                }
            }).length}
            </h3>
            {allPostTexts.filter((value) => {
                if(value.title.toLowerCase().includes(userQuery.toLowerCase())){
                    return value
                } else if(value.content.text.toLowerCase().includes(userQuery.toLowerCase())) {
                    return value
                } else {
                    return ''
                }
            }).map((post, index) => (
                <div key={index} className='flex items-center w-full mb-4' >
                    <div className='w-16 flex-none' >
                        <img className='align-middle rounded-full' src={post.postImage.url} alt={post.title}/>
                    </div>
                    <div className='flex-grow ml-4' >
                        <p className='text-gray-500 font-xs'>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} >
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchedPost;