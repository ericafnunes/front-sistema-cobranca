import { formatDate } from "./date";

export const normalizerCharges = (charges) => {
    return charges.map((charge) => {
        return {
            ...charge,
            data_vencimento: formatDate(charge.data_vencimento),
            valor: `R$ ${(charge.valor).replace(".", ",")}`,
        };
    });
};