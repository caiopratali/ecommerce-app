import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { Product } from '../components/Product';
import { fetchProducts } from '../services/products/fetchProducts';

export default function HomeScreenRoute() {

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const addNewProduct = () => {
    router.push('/product/create');
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
    backgroundColor: '#fff',
  },
});
