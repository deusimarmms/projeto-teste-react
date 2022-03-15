import { useEffect, useState, useCallback } from 'react';

import '../Home/styles.css';
import { Posts } from '../../components/Posts';

import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState([0])
  const [postPerPage] = useState([50])
  const [searchValue, setSearchValue] = useState('')
  const noMorePosts = page + postPerPage >= allPosts.length;
  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
      const postsAndPhotos = await loadPosts();
  
      setPosts(postsAndPhotos.slice(page, postsPerPage));
      setAllPosts(postsAndPhotos);
    }, []);

  useEffect(() => {
    handleLoadPosts(0, postPerPage)
  }, [handleLoadPosts, page, postPerPage])


  const loadMorePosts = (page, postsPerPage) => {

    const nextPage = page + postPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts)


    setPosts(posts);
    setPage(nextPage)
  }


  const handleChange = (e) => {
    const { value } = e.target
    setSearchValue(value)
  }



  return (
    <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
          <h1>SearchValue :{searchValue}</h1>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />

      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (<p> Não existem Posts =\ </p>)}
      <div className='button-container'>
        {!searchValue &&
          (<Button text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />)}

      </div>

    </section>

  )
}




/* export class Home2 extends Component {
  state = {

    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 50,
    searchValue: ''
  };

  timeOutUpdate = null


  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos,
    })

  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = page + postPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage });
  }


  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value });
  }
  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      }) : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h1>SearchValue :{searchValue}</h1>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />

        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (<p> Não existem Posts =\ </p>)}
        <div className='button-container'>
          {!searchValue &&
            (<Button text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />)}

        </div>

      </section>

    )
  }
} */


export default Home;