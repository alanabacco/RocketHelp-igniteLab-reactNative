import { useState } from "react";
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from "native-base";

import Logo from "../assets/logo_secondary.svg";
import { FontAwesome } from "@expo/vector-icons";

import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">("open");
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId }); // navega pra tela de detalhes levando o orderId como parâmetro
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.700"
        pt={12}
        pb={5}
        px={6} //padding no eixo X
      >
        <Logo />

        <IconButton
          icon={<FontAwesome name="sign-out" size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200" fontSize="lg">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={6}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        <FlatList // quando tem uma listagem e quer exibir vários elementos
          data={orders}
          keyExtractor={(item) => item.id} // identificador único
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false} // tira a barra vertical
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <FontAwesome name="wechat" size={48} color={colors.gray[300]} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {"\n"}
                solicitações {statusSelected === "open" ? "em andamento" : "finalizadas"}
              </Text>
            </Center>
          )} // pode renderizar alguma coisa quando a lista está vazia
        />

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
