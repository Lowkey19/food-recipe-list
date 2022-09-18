import { Popover, Typography } from '@mui/material';
import { navigate } from '@reach/router';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getUserInfo, logout } from '../api/auth';
import { IUser } from '../types/auth';

interface Props {
  icon?: ReactNode;
  hover?: boolean;
  onLogout: () => void;
}

const MenuLink = styled(Typography)`
  display: flex;
  cursor: pointer;
`;

const StyledPopover = styled(Popover)<{ popoverstyle?: string }>`
  display: flex;
  > .MuiPaper-root {
    padding: 20px;
    border-radius: 4px;
    margin-left: 0;
    margin-top: 0;
    width: 200px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-grow: 2;
  align-items: center;
`;

const LogoutButton = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: center;
  border-radius: 26px;
  border: 1px solid #002447;
  padding: 2px 36.5px;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const UserBadge = styled.div`
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #002447;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-right: 8px;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

const Title = styled.div`
  font-size: 11px;
  font-weight: 400;
`;

const ProfileCard = (props: Props): ReactElement<Props> => {
  const { icon, hover, onLogout, ...others } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState<IUser>({} as IUser);

  useEffect(() => {
    const getUserDetails = async () => {
      const data = await getUserInfo();
      console.log(data);
      if (Object.keys(data).length) setUserInfo(data);
    };

    getUserDetails();
  }, []);

  const getUserInitials = () => {
    const name = userInfo?.email;
    console.log(name);
    if (name) {
      const fName = name[0]?.toUpperCase();
      return fName ;
    }
    return '';
  };

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleClick = (event: any) => {
    !hover && setAnchorEl(event.currentTarget);
  };

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleHover = (event: any) => {
    hover && setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate('/');
    } catch (e) {

    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <MenuContainer {...others}>
      <MenuLink aria-describedby={id} onClick={handleClick} onMouseEnter={handleHover}>
        {icon}
      </MenuLink>
      <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...others}
      >
        <ProfileContainer>
          <UserBadge>{getUserInitials()}</UserBadge>
          <div>
            <Name>{userInfo?.username}</Name>
            <Title>{userInfo?.email}</Title>
          </div>
        </ProfileContainer>
        <LogoutButton onClick={handleLogout}>
          <Typography>Log Out</Typography>
        </LogoutButton>
      </StyledPopover>
    </MenuContainer>
  );
};

export default ProfileCard;
