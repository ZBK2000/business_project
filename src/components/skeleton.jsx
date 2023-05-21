import { Box, Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useTheme } from "@emotion/react";

const SkeletonComponent = () => {
    const theme = useTheme();
    return (
      <Grid sx={{ marginLeft: "0px", marginRight: "0px", width: "95%", marginBottom:"30px"}}
      container
      
      spacing={2}
      className="container">
        {[...Array(10)].map((_, index) => (
          <Grid
            item
            padding={'8px !important'}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2.4}
            key={index}
          >
            <Card
              className="tracks"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                margin: 'auto',
                position: 'relative',
              }}
            >
              
              <Box height={"140px"} width={"100%"}>
              <Skeleton height={140}/>
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Skeleton height={20} width={100} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Skeleton height={16} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Skeleton height={16} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Skeleton height={16} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Skeleton height={16} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

export default SkeletonComponent;
