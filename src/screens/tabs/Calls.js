import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import CustomDarkBackground from '@components/CustomDarkBackground';
import normalize from 'react-native-normalize';
import CustomText from '@components/CustomText';
import { useDispatch, useSelector } from 'react-redux';
import * as callsActions from '@store/actions/contacts';
import CustomLoading from '../../components/CustomLoading';
import CustomCallCard from '../../components/CustomCallCard';

const Calls = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [calls, setCalls] = useState([]);
  const callsDATA = useSelector((state) => state.contacts.calls);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  useEffect(() => {
    if (!callsDATA) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [callsDATA]);

  useEffect(() => {
    if (callsDATA) {
      setCalls(callsDATA);
    }
  }, [callsDATA]);

  const loadCalls = useCallback(async () => {
    try {
      setError(null);
      await dispatch(callsActions.fetchCalls());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    loadCalls();
  }, [loadCalls]);

  return (
    <CustomDarkBackground>
      <>
        {loading &&
          <CustomLoading />
        }
        {!loading && (
          <>
            <CustomText style={{ marginTop: normalize(25) }}>Calls</CustomText>
            <View style={{ marginTop: normalize(20) }}>
              <FlatList
                data={calls}
                renderItem={({ item }) => <CustomCallCard data={item} />}
                keyExtractor={(item, index) => index}
              />
            </View>
          </>
        )}
      </>
    </CustomDarkBackground>
  );
};

export default Calls;
