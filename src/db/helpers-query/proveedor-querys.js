const { Database } = require('../connections-db');

export class ProviderOfQuery{
    constructor(){
        this.database = new Database();
    }

    async obtenerNumeroDeTracking(){
        const query = `SELECT TOP 500 CLI_DocumentosPFPJ.NUMERODOCUMENTO
        FROM dbo.CLI_CLIENTES Clientes
        INNER JOIN dbo.CLI_SEGMENTOS Segmento ON Segmento.COD_SEGMENTO = Clientes.SEGMENTOCLIENTE
        INNER JOIN dbo.CLI_SUBSEGMENTOS SubSegmento ON SubSegmento.COD_SUBSEGMENTO = Clientes.SUBSEGMENTOCLIENTE AND SubSegmento.COD_SEGMENTO > 0
        INNER JOIN dbo.SUCURSALES Sucursales ON Sucursales.SUCURSAL = Clientes.SUCURSALVINCULADA
        INNER JOIN CLI_CLIENTEPERSONA ON CLI_CLIENTEPERSONA.CODIGOCLIENTE = Clientes.CODIGOCLIENTE
        INNER JOIN CLI_DocumentosPFPJ ON CLI_DocumentosPFPJ.NUMEROPERSONAFJ = CLI_CLIENTEPERSONA.NUMEROPERSONA
        LEFT JOIN CLI_MAESTRO_FALLECIDOS ON CLI_DocumentosPFPJ.NUMERODOCUMENTO = CLI_MAESTRO_FALLECIDOS.CUIL
        WHERE CLI_MAESTRO_FALLECIDOS.CUIL IS NULL
        AND Clientes.TZ_LOCK = 0
        AND Clientes.TIPO = 'F'
        AND Clientes.CODIGOBLOQUEO <> 'B'
        AND Clientes.ESTADO = 0`;

        try {
            const result = await this.database.query('tracking', query);
            return result[Math.floor(Math.random() * result.length)];
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async obtenerNumeroDeShipping(){
        const query = `select top(100) s.sucursal AS SUCURSAL, s.cuenta AS CUENTA, c1785, moneda as MONEDA, cd.TIPODOCUMENTO, cd.NUMERODOCUMENTO AS CUIT
        from SALDOS s
        inner join CLI_ClientePersona cp on cp.CODIGOCLIENTE = s.C1803
        inner join CLI_DocumentosPFPJ cd on cd.NUMEROPERSONAFJ = cp.NUMEROPERSONA
        left join VW_BLOQUEOS vb on vb.SALDO_JTS_OID = s.JTS_OID
        where producto = 1 and c1785 = 3  and s.TZ_LOCK = 0 and c1651 != 1 and c1679 != 1 and moneda = 1 and c1604 <= 5000
        and c1604 >=0 and s.sucursal = 30 and cd.TIPODOCUMENTO = 'CUIT'`;

        try {
            const result = await this.database.query('shipping', query);
            return result[Math.floor(Math.random() * result.length)];
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}