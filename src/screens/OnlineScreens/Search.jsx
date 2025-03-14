import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import selectAlbumData from '../../store/album/albumSelector'
import { fetchResetSearch } from '../../store/album/albumSlice';
import SearchBar from '../../components/Services/SearchBar';
import PageLoader from '../../components/Loader/PageLoader';
import SearchView from '../../components/Ui/SearchView';

const Search = () => {
  const {loading} = useSelector(selectAlbumData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResetSearch());

  }, [])
  
  return (
    <>
      <SearchBar />
      {loading ? <PageLoader /> : <SearchView />}
    </>
  )
}

export default Search