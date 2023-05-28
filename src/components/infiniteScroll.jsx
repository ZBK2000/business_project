import { Grid } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const InfiniteScroll = ({ children, loadMore,links }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [fetchCount, setFetchCount] = useState(2);
  

    const observeLastElement = useCallback((node) => {
      if (node) {
        if (isFetching) return
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 1.0,
        };
  
        const handleIntersect = (entries) => {
          const target = entries[0];
            console.log(target)
          if (target.isIntersecting && !isFetching) {
            
          //  setIsFetching(true);
            console.log(isFetching)
            //setTimeout(()=>loadMore(fetchCount),10000)
           loadMore(fetchCount);
            setFetchCount((prevCount) => prevCount + 1);
            observer.disconnect
          }
        };
  
        const observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(node);
  
        return () => {
          observer.unobserve(node);
        };
      }
    }, [isFetching, loadMore]);
  
    useEffect(() => {
      setIsFetching(false);
    }, [links]);

  return (
    <Grid
        sx={{ marginLeft: "0px", marginRight: "0px", width: "100%", marginBottom:"30px"}}
        container
        
        spacing={2}
        className="container"
      >
      {children.map((child, index) => {
        if (index === children.length - 1) {
          return (
            <Grid
      
        item
        padding={"8px !important"}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2.4}
        key={index}  ref={observeLastElement}>
              {child}
              
            </Grid>
          );
        } else {
          return <Grid
      
          item
          padding={"8px !important"}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2.4}
          key={index}>{child}
          </Grid>;
        }
      })}
      {isFetching && <p>Loading more...</p>}
    </Grid>
  );
};

export default InfiniteScroll;