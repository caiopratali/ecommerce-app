import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { Product } from '../components/Product';
import { fetchProducts } from '../services/products/fetchProducts';

export default function HomeScreenRoute() {

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const addNewProduct = () => {
    router.push('/product/create');
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color='#000' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        style={{ marginVertical: 24 }}
        contentContainerStyle={{ gap: 24 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Product {...item} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      <Button text='Adicionar Produto' onPress={addNewProduct} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
