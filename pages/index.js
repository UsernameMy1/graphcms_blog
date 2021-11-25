import Head from 'next/head'
import {PostCard, Categories, PostWidget, Loader} from "../components";
import {getPosts} from "../services";
import FeaturedPosts from "../sections/FeaturedPosts";
import {useRouter} from "next/router";
import React from "react";


export default function Home({ posts }) {
    const router = useRouter()

    if(router.isFallback){
        return <Loader/>
    }
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <Head>
        <title>CMS BLOG </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <FeaturedPosts></FeaturedPosts>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" >
        <div className="lg:col-span-8 col-span-1">
            {posts.map((post) => <PostCard key={post.node.title} post={post.node} />)}
        </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relatve top-8" >
                <PostWidget/>
                <Categories/>
            </div>
          </div>
      </div>


    </div>
  )
}

export async function  getStaticProps() {
    const posts = (await getPosts()) || [];

    return {
        props: {
            posts
        }
    }
}