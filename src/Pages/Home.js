import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY);
  return (
    <Grid columns={3} divided style={{ justifyContent: "center" }}>
    
      <Grid.Row >
        {user && (
          <Grid.Column width={8}>
            <PostForm />
          </Grid.Column>
        )}
         </Grid.Row>
         <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
         <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Row
                  key={post.id}
                  style={{ marginBottom: 20, marginLeft: 30 }}
                >
                  <PostCard post={post} />
                </Grid.Row>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
