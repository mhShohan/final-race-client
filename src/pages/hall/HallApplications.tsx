import { Box, Button, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useGetRegistrationFeeFormByHallQuery } from '../../store/features/feeForm.api';
// import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const HallApplications = () => {
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isFetching } = useGetRegistrationFeeFormByHallQuery({
    status: true,
    search
  });
  // const [acceptOrDecline] = useAcceptOrDeclineFeeFomMutation();

  if (isLoading || isFetching) return <Loader fullPage />;

  // const declineApplication = async (id: string) => {
  //   const { isDenied, isDismissed, value } = await Swal.fire({
  //     title: 'Decline Application',
  //     text: 'Please Provide details message for decline this application...!!!',
  //     input: 'textarea',
  //     inputAttributes: {
  //       autocapitalize: 'off'
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: 'Decline',
  //     confirmButtonColor: 'red',
  //     showLoaderOnConfirm: true,
  //     inputValidator: (value) => {
  //       return new Promise((resolve) => {
  //         if (value) {
  //           resolve();
  //         } else {
  //           resolve('Please provide and message');
  //         }
  //       });
  //     }
  //   });

  //   if (isDenied || isDismissed) {
  //     return;
  //   }

  //   const payload = {
  //     declineMessage: value,
  //     status: 'rejected_by_chairman'
  //   };

  //   await acceptOrDecline({ id, payload });
  // };

  // const acceptApplication = async (id: string) => {
  //   const { isConfirmed, isDenied } = await Swal.fire({
  //     text: 'Do you want to Accept this Application?',
  //     showCancelButton: true,
  //     confirmButtonText: 'Accept'
  //   });

  //   if (isConfirmed) {
  //     const payload = { status: 'approved_by_chairman' };
  //     await acceptOrDecline({ id, payload });

  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Application Accepted!!!',
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   } else if (isDenied) {
  //     Swal.fire('Changes are not saved', '', 'info');
  //   }
  // };

  return (
    <Stack>
      <Stack my={2} alignItems="flex-end">
        <Box width="300px" display="flex">
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            placeholder="Search by StudentId"
          />
          <IconButton
            onClick={() => setSearch(searchTerm)}
            color="primary"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 0,
              '&:hover': {
                bgcolor: 'primary.main'
              }
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Stack>
      <Stack gap={2}>
        {data.data.length === 0 && <Typography>No Application Found</Typography>}
        {data.data.map((form: any) => (
          <Stack key={form._id} p={4} borderRadius={4} boxShadow={24}>
            <Grid container>
              <Grid item xs={6}>
                <Typography>StudentId: {form.studentId.studentId}</Typography>
                <Typography>Name: {form.studentId.name}</Typography>
                <Typography>Session: {form.studentId.session}</Typography>
                <Typography>Exam Types: {form.examType}</Typography>
                <Typography textTransform="capitalize">
                  Status: {form.status.split('_').join(' ')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Year: {form.year}</Typography>
                <Typography>Semester: {form.semester}</Typography>
                <Typography>
                  Total Credit:{' '}
                  {form.courses.reduce((acc: number, cur: any) => (acc += cur.credit), 0)}
                </Typography>
              </Grid>
            </Grid>
            <>
              <Stack gap={1} direction="row" mt={4}>
                <Link to={`/application/${form._id}`} style={{ width: '100%' }}>
                  <Button size="small" variant="contained" fullWidth>
                    View Application Details
                  </Button>
                </Link>
                <Link to={`/students/${form.studentId._id}`} style={{ width: '100%' }}>
                  <Button size="small" variant="contained" fullWidth color="info">
                    View Student Details
                  </Button>
                </Link>
                {/* <Button
                  size="small"
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => acceptApplication(form._id)}
                >
                  Accept Application
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => declineApplication(form._id)}
                >
                  Decline Application
                </Button> */}
              </Stack>
            </>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default HallApplications;
