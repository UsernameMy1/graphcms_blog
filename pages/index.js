import FeaturedPosts from '../sections/FeaturedPosts';
import { HomePosts , Categories, PostWidget, SearchedPost } from '../components';
import {getPosts, getAllPostsText} from '../services';
import {useEffect, useState} from "react";


export default function Home({ posts }) {

    const [userQuery, setUserQuery] = useState('')
    const [userSort, setUserSort] = useState('new-post-sort')

    return (
        <div className="container mx-auto px-10 mb-8">

            <FeaturedPosts />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    <HomePosts userSort={userSort}/>
                </div>

                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        <input
                            className='w-full bg-white shadow-lg rounded-lg p-2 mb-4'
                            type="text"
                            placeholder='Поиск'
                            value={userQuery}
                            onChange={
                                (e) => (
                                    setUserQuery(e.target.value)
                                )}
                        />
                        <select
                            className='w-full bg-white shadow-lg rounded-lg p-2 mb-4'
                            type="text"
                            value={userSort}
                            onChange={
                                (e) => (
                                    setUserSort(e.target.value)
                                )}
                        >
                            <option value="new-post-sort">Новые посты</option>
                            <option value="post-with-comments">Посты с комментариями</option>
                        </select>
                        {userQuery.length > 0 ? <SearchedPost userQuery={userQuery}/> : <PostWidget />}
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Fetch data at build time
export async function getStaticProps() {
    const posts = (await getPosts()) || [];
    return {
        props: { posts },
    };
}