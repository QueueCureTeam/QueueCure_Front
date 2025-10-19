import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const RoleChecker = ({ onRoleDetected, children }) => {
  const [userGroup, setUserGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = () => {
      try {
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        const idToken = localStorage.getItem('id_token');
        
        if (!idToken) {
          console.warn('No id_token found in localStorage');
          setUserGroup('guest');
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(idToken);
        
        let userGroup = 'guest';
        
        if (decodedToken['cognito:groups'] && Array.isArray(decodedToken['cognito:groups'])) {
          const groups = decodedToken['cognito:groups'];
          if (groups.includes('doctor')) {
            userGroup = 'doctor';
          } else if (groups.includes('pharmacist')) {
            userGroup = 'pharmacist';
          } else if (groups.length > 0) {
            userGroup = groups[0]; 
          }
        } else if (decodedToken.group) {
          const group = decodedToken.group;
          if (group === 'doctor' || group === 'pharmacist') {
            userGroup = group;
          } else {
            userGroup = 'patient';
          }
        }

        setUserGroup(userGroup);
        if (onRoleDetected) {
          onRoleDetected(userGroup);
        }
        
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserGroup('guest');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [onRoleDetected]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return children(userGroup);
};

export default RoleChecker;