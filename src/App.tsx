import { Fragment, useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from './logo.svg';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@material-ui/core/styles';
import { saveAs } from 'file-saver';

const useStyles = makeStyles((_theme) => ({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'left',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    overflow:'auto'
  },
  resetButton: {
    margin: _theme.spacing(1),

    // display: 'block',
  },
  demoform: {
    // margin: 'auto',
    padding: '1rem',
  },
  button: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      margin: _theme.spacing(1),
  },
}));

const initialData = {
  // username: 'johndoe',
  // password: 'password4',
  // discord_login: {
  //   token: 'NTQ1MjgxODU1OTg2MDczNjEw.YWuEdw.CEjOpdgaqPYJGEn5cT4gFKBsnlrk',
  //   imgur_id: "32d4aa908e8018b",
  // },
  // messages: [
  //   {
  //     message: "This is First Message",
  //     image: "/home/silox/Pictures/image1.jpeg"
  //   },
  // ],
  // channels: [
  //   {
  //     server_id: "1",
  //     channel_id: "898129644522459136",
  //     post_every: 0.5,
  //     image: true
  //   },
  // ]
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

const App = () => {
  const classes = useStyles();
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [jsonformsData, setJsonformsData] = useState<any>(initialData);

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(jsonformsData, null, 2));
  }, [jsonformsData]);

  const downloadData = () => {
    // setJsonformsData({});
    var blob = new Blob([JSON.stringify(jsonformsData, null, 2)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'config.json');
    // FileSaver.saveAs(blob, "hello world.txt");
    // console.log(JSON.stringify(jsonformsData, null, 2));
  };

  const clearData = () => {
    setJsonformsData({});
  };

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          {/* <img src={logo} className='App-logo' alt='logo' /> */}
          <h1 className='App-title'>Welcome to Discord Bot</h1>
          <p className='App-intro'>More Forms. Less Code.</p>
        </header>
      </div>

      <Grid
        container
        justify={'center'}
        spacing={1}
        className={classes.container}
      >
        {/* <Grid item sm={12}>
          <Typography variant={'h3'} className={classes.title}>
            JSON data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{displayDataAsString}</pre>
          </div>

        </Grid> */}
        <Grid item sm={10}>
          <Typography variant={'h3'} className={classes.title}>
            Config Generator
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={jsonformsData}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setJsonformsData(data)}
            />
          </div>
          <div className={classes.button}>
          <Button
            className={classes.resetButton}
            onClick={downloadData}
            color='primary'
            variant='contained'
          >
            Download
          </Button>
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Clear
          </Button>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
