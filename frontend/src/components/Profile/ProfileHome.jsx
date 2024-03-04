import React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}));


const ProfileHome = () => {

    const {username,email,address,phone} = useSelector((state) => (state.auth));

  return (
    <div className=' w-full p-1 pt-0'>

        <div className=" flex gap-2 flex-col justify-center items-center text-md md:text-xl lg:text-2xl md:gap-3 lg:gap-4">

            <div className=" pb-3 md:pb-6">
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" sx={{ width: 160, height: 160 }}/>
                </StyledBadge>
            </div>
            <p>
                User Name : {username}
            </p>
            <p>
                Email : {email}
            </p>
            <p>
                Address : {address}
            </p>
            <p>
                Phone Number : {phone}
            </p>

        </div>

    </div>
  )
}

export default ProfileHome