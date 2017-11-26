--
-- PostgreSQL database dump
--

-- Dumped from database version 9.0.4
-- Dumped by pg_dump version 9.0.4
-- Started on 2013-07-18 16:43:42

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

--
-- TOC entry 6 (class 2615 OID 169498)
-- Name: clone; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA clone;


ALTER SCHEMA clone OWNER TO postgres;

--
-- TOC entry 7 (class 2615 OID 169499)
-- Name: cuadro; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA cuadro;


ALTER SCHEMA cuadro OWNER TO postgres;

--
-- TOC entry 8 (class 2615 OID 169500)
-- Name: nomencladores; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA nomencladores;


ALTER SCHEMA nomencladores OWNER TO postgres;

--
-- TOC entry 9 (class 2615 OID 169501)
-- Name: pago; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA pago;


ALTER SCHEMA pago OWNER TO postgres;

--
-- TOC entry 10 (class 2615 OID 169502)
-- Name: plantilla; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA plantilla;


ALTER SCHEMA plantilla OWNER TO postgres;

--
-- TOC entry 11 (class 2615 OID 169503)
-- Name: utiles; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA utiles;


ALTER SCHEMA utiles OWNER TO postgres;

--
-- TOC entry 13 (class 2615 OID 170904)
-- Name: vistas_resumen; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA vistas_resumen;


ALTER SCHEMA vistas_resumen OWNER TO postgres;

--
-- TOC entry 595 (class 2612 OID 11574)
-- Name: plpgsql; Type: PROCEDURAL LANGUAGE; Schema: -; Owner: postgres
--

CREATE OR REPLACE PROCEDURAL LANGUAGE plpgsql;


ALTER PROCEDURAL LANGUAGE plpgsql OWNER TO postgres;

SET search_path = clone, pg_catalog;

--
-- TOC entry 25 (class 1255 OID 169504)
-- Dependencies: 6 595
-- Name: get_conexion(); Type: FUNCTION; Schema: clone; Owner: postgres
--

CREATE FUNCTION get_conexion() RETURNS character varying
    LANGUAGE plpgsql
    AS $$
		declare
		
			_config record;
			_text varchar default '';
		begin
			select * from clone.config into _config;

			_text = 'dbname='||_config.nombre||' user='||_config.usuario||' password='||_config.contrasenna||' host='||_config.direccion||' port='||_config.puerto;

			return _text;
			
		end;
	$$;


ALTER FUNCTION clone.get_conexion() OWNER TO postgres;

--
-- TOC entry 26 (class 1255 OID 169505)
-- Dependencies: 595 6
-- Name: get_id(); Type: FUNCTION; Schema: clone; Owner: postgres
--

CREATE FUNCTION get_id() RETURNS character varying
    LANGUAGE plpgsql
    AS $$
	declare
		id_table integer DEFAULT nextval('clone.my_seq');
		node_name varchar default (select nodo from clone.config);
		bd_name varchar default current_database();
		id_generic varchar default node_name || '_' || bd_name || '_' ||id_table::text;
		
	begin
		return id_generic;
	end;
	$$;


ALTER FUNCTION clone.get_id() OWNER TO postgres;

SET search_path = vistas_resumen, pg_catalog;

--
-- TOC entry 27 (class 1255 OID 179345)
-- Dependencies: 595 13
-- Name: update_time(); Type: FUNCTION; Schema: vistas_resumen; Owner: postgres
--

CREATE FUNCTION update_time() RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
 _id character varying(50);  
BEGIN 
	 
	FOR _id IN SELECT id FROM plantilla.trabajador LOOP

		UPDATE plantilla.trabajador SET tiempo=tiempo+1 WHERE id = _id;
			    
	END LOOP;
      
	RETURN 1;
END;
$$;


ALTER FUNCTION vistas_resumen.update_time() OWNER TO postgres;

SET search_path = clone, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 1787 (class 1259 OID 169506)
-- Dependencies: 2277 6
-- Name: config; Type: TABLE; Schema: clone; Owner: postgres; Tablespace: 
--

CREATE TABLE config (
    id character varying(50) DEFAULT 1 NOT NULL,
    nombre character varying(50) NOT NULL,
    direccion character varying(100) NOT NULL,
    puerto smallint NOT NULL,
    usuario character varying(50) NOT NULL,
    contrasenna character varying(255) NOT NULL,
    nodo character varying(50)
);


ALTER TABLE clone.config OWNER TO postgres;

--
-- TOC entry 1788 (class 1259 OID 169513)
-- Dependencies: 6
-- Name: my_seq; Type: SEQUENCE; Schema: clone; Owner: postgres
--

CREATE SEQUENCE my_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clone.my_seq OWNER TO postgres;

--
-- TOC entry 2585 (class 0 OID 0)
-- Dependencies: 1788
-- Name: my_seq; Type: SEQUENCE SET; Schema: clone; Owner: postgres
--

SELECT pg_catalog.setval('my_seq', 1268, true);


SET search_path = nomencladores, pg_catalog;

--
-- TOC entry 1789 (class 1259 OID 169515)
-- Dependencies: 2278 2279 8
-- Name: agencia; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE agencia (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    empresaid character varying(50),
    codigo smallint,
    nombre character varying(50),
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.agencia OWNER TO postgres;

--
-- TOC entry 1792 (class 1259 OID 169537)
-- Dependencies: 2283 2284 8
-- Name: anno; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE anno (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    valor integer NOT NULL,
    activo character(255) DEFAULT 'true'::bpchar NOT NULL
);


ALTER TABLE nomencladores.anno OWNER TO postgres;

--
-- TOC entry 1793 (class 1259 OID 169542)
-- Dependencies: 2285 2286 8
-- Name: anno_mes; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE anno_mes (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    annoid character varying(50) NOT NULL,
    mesid character varying(50) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.anno_mes OWNER TO postgres;

--
-- TOC entry 1790 (class 1259 OID 169520)
-- Dependencies: 2280 8
-- Name: area; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE area (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    agenciaid character varying(50),
    activo boolean,
    nombre character varying(255) NOT NULL
);


ALTER TABLE nomencladores.area OWNER TO postgres;

--
-- TOC entry 1795 (class 1259 OID 169560)
-- Dependencies: 2289 8
-- Name: cargo_militar; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE cargo_militar (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean
);


ALTER TABLE nomencladores.cargo_militar OWNER TO postgres;

--
-- TOC entry 1796 (class 1259 OID 169564)
-- Dependencies: 2290 8
-- Name: categoria_ocupacional; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE categoria_ocupacional (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean,
    nombre character varying
);


ALTER TABLE nomencladores.categoria_ocupacional OWNER TO postgres;

--
-- TOC entry 1797 (class 1259 OID 169571)
-- Dependencies: 2291 8
-- Name: clasificacion_d_i; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE clasificacion_d_i (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean,
    noambre character varying
);


ALTER TABLE nomencladores.clasificacion_d_i OWNER TO postgres;

--
-- TOC entry 1798 (class 1259 OID 169578)
-- Dependencies: 2292 2293 8
-- Name: color_piel; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE color_piel (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.color_piel OWNER TO postgres;

--
-- TOC entry 1799 (class 1259 OID 169587)
-- Dependencies: 2294 8
-- Name: condecoracion_tipo; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE condecoracion_tipo (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean
);


ALTER TABLE nomencladores.condecoracion_tipo OWNER TO postgres;

--
-- TOC entry 2586 (class 0 OID 0)
-- Dependencies: 1799
-- Name: TABLE condecoracion_tipo; Type: COMMENT; Schema: nomencladores; Owner: postgres
--

COMMENT ON TABLE condecoracion_tipo IS 'medallas 
distinciones';


--
-- TOC entry 1800 (class 1259 OID 169591)
-- Dependencies: 2295 2296 8
-- Name: contrato_tipo; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE contrato_tipo (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre character(255) NOT NULL
);


ALTER TABLE nomencladores.contrato_tipo OWNER TO postgres;

--
-- TOC entry 1801 (class 1259 OID 169596)
-- Dependencies: 2297 2298 8
-- Name: dbajas; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE dbajas (
    id character varying DEFAULT clone.get_id(),
    nombre character varying,
    activo boolean DEFAULT true
);


ALTER TABLE nomencladores.dbajas OWNER TO postgres;

--
-- TOC entry 1791 (class 1259 OID 169528)
-- Dependencies: 2281 2282 8
-- Name: empresa; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE empresa (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre character(255) NOT NULL
);


ALTER TABLE nomencladores.empresa OWNER TO postgres;

--
-- TOC entry 1802 (class 1259 OID 169604)
-- Dependencies: 2299 2300 8
-- Name: estado_civil; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE estado_civil (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.estado_civil OWNER TO postgres;

--
-- TOC entry 1836 (class 1259 OID 170721)
-- Dependencies: 2370 2371 8
-- Name: forma_pago; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE forma_pago (
    id character varying DEFAULT clone.get_id() NOT NULL,
    nombre character varying,
    activo boolean DEFAULT true
);


ALTER TABLE nomencladores.forma_pago OWNER TO postgres;

--
-- TOC entry 1803 (class 1259 OID 169613)
-- Dependencies: 2301 2302 8
-- Name: grado_militar; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE grado_militar (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.grado_militar OWNER TO postgres;

--
-- TOC entry 1804 (class 1259 OID 169618)
-- Dependencies: 2303 2304 8
-- Name: grupo_escala; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE grupo_escala (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre character varying(255) NOT NULL,
    salario integer,
    pago_adicion integer
);


ALTER TABLE nomencladores.grupo_escala OWNER TO postgres;

--
-- TOC entry 1838 (class 1259 OID 170736)
-- Dependencies: 2373 2374 8
-- Name: horario_trabajo; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE horario_trabajo (
    id character varying DEFAULT clone.get_id() NOT NULL,
    tipo character varying,
    activo boolean DEFAULT true
);


ALTER TABLE nomencladores.horario_trabajo OWNER TO postgres;

--
-- TOC entry 1805 (class 1259 OID 169623)
-- Dependencies: 2305 2306 8
-- Name: integracion; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE integracion (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.integracion OWNER TO postgres;

--
-- TOC entry 2587 (class 0 OID 0)
-- Dependencies: 1805
-- Name: TABLE integracion; Type: COMMENT; Schema: nomencladores; Owner: postgres
--

COMMENT ON TABLE integracion IS 'pcc
ujc';


--
-- TOC entry 1806 (class 1259 OID 169628)
-- Dependencies: 2307 2308 8
-- Name: lugar_procedencia; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE lugar_procedencia (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true
);


ALTER TABLE nomencladores.lugar_procedencia OWNER TO postgres;

--
-- TOC entry 1807 (class 1259 OID 169637)
-- Dependencies: 2309 2310 8
-- Name: mbajas; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE mbajas (
    id character varying DEFAULT clone.get_id(),
    nombre character varying,
    activo boolean DEFAULT true
);


ALTER TABLE nomencladores.mbajas OWNER TO postgres;

--
-- TOC entry 1794 (class 1259 OID 169547)
-- Dependencies: 2287 2288 8
-- Name: mes; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE mes (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(50) NOT NULL,
    numero integer,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.mes OWNER TO postgres;

--
-- TOC entry 1808 (class 1259 OID 169653)
-- Dependencies: 2311 2312 8
-- Name: municipio; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE municipio (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    provinciaid character varying(50),
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.municipio OWNER TO postgres;

--
-- TOC entry 1809 (class 1259 OID 169658)
-- Dependencies: 2313 2314 8
-- Name: nivel_cultural; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE nivel_cultural (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.nivel_cultural OWNER TO postgres;

--
-- TOC entry 1810 (class 1259 OID 169663)
-- Dependencies: 2315 2316 8
-- Name: nivel_preparacion; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE nivel_preparacion (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre character varying(255) NOT NULL
);


ALTER TABLE nomencladores.nivel_preparacion OWNER TO postgres;

--
-- TOC entry 1811 (class 1259 OID 169668)
-- Dependencies: 2317 2318 8
-- Name: norma_juridica; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE norma_juridica (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre character varying(255) NOT NULL
);


ALTER TABLE nomencladores.norma_juridica OWNER TO postgres;

--
-- TOC entry 1812 (class 1259 OID 169673)
-- Dependencies: 2319 2320 8
-- Name: provincia; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE provincia (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.provincia OWNER TO postgres;

--
-- TOC entry 1813 (class 1259 OID 169678)
-- Dependencies: 2321 2322 8
-- Name: registro_militar; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE registro_militar (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true
);


ALTER TABLE nomencladores.registro_militar OWNER TO postgres;

--
-- TOC entry 2588 (class 0 OID 0)
-- Dependencies: 1813
-- Name: TABLE registro_militar; Type: COMMENT; Schema: nomencladores; Owner: postgres
--

COMMENT ON TABLE registro_militar IS 'en el mar
torrero';


--
-- TOC entry 1814 (class 1259 OID 169687)
-- Dependencies: 2323 2324 8
-- Name: reparto; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE reparto (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    municipioid character varying(50),
    activo character(255) DEFAULT 'true'::bpchar NOT NULL
);


ALTER TABLE nomencladores.reparto OWNER TO postgres;

--
-- TOC entry 1815 (class 1259 OID 169699)
-- Dependencies: 2325 2326 8
-- Name: sexo; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE sexo (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.sexo OWNER TO postgres;

--
-- TOC entry 1837 (class 1259 OID 170729)
-- Dependencies: 2372 8
-- Name: sistema_pago; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE sistema_pago (
    id character varying DEFAULT clone.get_id() NOT NULL,
    nombre character varying,
    activo boolean
);


ALTER TABLE nomencladores.sistema_pago OWNER TO postgres;

--
-- TOC entry 1816 (class 1259 OID 169708)
-- Dependencies: 2327 2328 8
-- Name: talla; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE talla (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    valor character varying(255) NOT NULL,
    talla_tipoid character varying(50),
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.talla OWNER TO postgres;

--
-- TOC entry 1817 (class 1259 OID 169713)
-- Dependencies: 2329 2330 8
-- Name: talla_tipo; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE talla_tipo (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.talla_tipo OWNER TO postgres;

--
-- TOC entry 2589 (class 0 OID 0)
-- Dependencies: 1817
-- Name: TABLE talla_tipo; Type: COMMENT; Schema: nomencladores; Owner: postgres
--

COMMENT ON TABLE talla_tipo IS 'camisa_saya
pantalon_blusa
zapato';


--
-- TOC entry 1818 (class 1259 OID 169734)
-- Dependencies: 2331 2332 8
-- Name: tipo; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE tipo (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.tipo OWNER TO postgres;

--
-- TOC entry 2590 (class 0 OID 0)
-- Dependencies: 1818
-- Name: TABLE tipo; Type: COMMENT; Schema: nomencladores; Owner: postgres
--

COMMENT ON TABLE tipo IS 'camisa saya pantalon blusa zapato';


--
-- TOC entry 1819 (class 1259 OID 169739)
-- Dependencies: 2333 2334 8
-- Name: ubicacion_defensa_tipo; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE ubicacion_defensa_tipo (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    ubicacion_defensa_tipoid character varying(50),
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.ubicacion_defensa_tipo OWNER TO postgres;

--
-- TOC entry 2591 (class 0 OID 0)
-- Dependencies: 1819
-- Name: TABLE ubicacion_defensa_tipo; Type: COMMENT; Schema: nomencladores; Owner: postgres
--

COMMENT ON TABLE ubicacion_defensa_tipo IS 'en el mar
torrero';


--
-- TOC entry 1820 (class 1259 OID 169744)
-- Dependencies: 2335 2336 8
-- Name: ubicacion_excepcional; Type: TABLE; Schema: nomencladores; Owner: postgres; Tablespace: 
--

CREATE TABLE ubicacion_excepcional (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    nombre character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE nomencladores.ubicacion_excepcional OWNER TO postgres;

--
-- TOC entry 2592 (class 0 OID 0)
-- Dependencies: 1820
-- Name: TABLE ubicacion_excepcional; Type: COMMENT; Schema: nomencladores; Owner: postgres
--

COMMENT ON TABLE ubicacion_excepcional IS 'en el mar
torrero';


SET search_path = pago, pg_catalog;

--
-- TOC entry 1821 (class 1259 OID 169749)
-- Dependencies: 2337 2338 9
-- Name: cliente; Type: TABLE; Schema: pago; Owner: postgres; Tablespace: 
--

CREATE TABLE cliente (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre character(255) NOT NULL
);


ALTER TABLE pago.cliente OWNER TO postgres;

--
-- TOC entry 1823 (class 1259 OID 169763)
-- Dependencies: 2341 2342 2343 9
-- Name: contrato; Type: TABLE; Schema: pago; Owner: postgres; Tablespace: 
--

CREATE TABLE contrato (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    contrato_tipoid character varying(50),
    activo boolean DEFAULT true NOT NULL,
    trabajadorid character varying(50) NOT NULL,
    fecha_inicio timestamp without time zone DEFAULT now() NOT NULL,
    fecha_final timestamp without time zone
);


ALTER TABLE pago.contrato OWNER TO postgres;

--
-- TOC entry 1822 (class 1259 OID 169754)
-- Dependencies: 2339 2340 9
-- Name: contratoooo; Type: TABLE; Schema: pago; Owner: postgres; Tablespace: 
--

CREATE TABLE contratoooo (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    clienteid character varying(50),
    activo boolean DEFAULT true NOT NULL,
    nombre character(255) NOT NULL
);


ALTER TABLE pago.contratoooo OWNER TO postgres;

--
-- TOC entry 1824 (class 1259 OID 169772)
-- Dependencies: 2344 2345 9
-- Name: proyecto; Type: TABLE; Schema: pago; Owner: postgres; Tablespace: 
--

CREATE TABLE proyecto (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    monto double precision NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL,
    areaid character varying(50) NOT NULL,
    codigo character varying(20) NOT NULL,
    contratooooid character varying(50),
    activo boolean DEFAULT true NOT NULL,
    fecha_inicio date,
    fecha_fin date
);


ALTER TABLE pago.proyecto OWNER TO postgres;

--
-- TOC entry 1825 (class 1259 OID 169788)
-- Dependencies: 2346 2347 2348 9
-- Name: reporte_pago; Type: TABLE; Schema: pago; Owner: postgres; Tablespace: 
--

CREATE TABLE reporte_pago (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    proyectoid character varying(50),
    anno_mesid character varying(50),
    activo boolean DEFAULT true NOT NULL,
    nombre character varying(50) DEFAULT 0 NOT NULL
);


ALTER TABLE pago.reporte_pago OWNER TO postgres;

--
-- TOC entry 1828 (class 1259 OID 169817)
-- Dependencies: 2355 2356 9
-- Name: trabajador_proyecto; Type: TABLE; Schema: pago; Owner: postgres; Tablespace: 
--

CREATE TABLE trabajador_proyecto (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    proyectoid character varying(50) NOT NULL,
    fecha date NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    trabajadorid character varying(50) NOT NULL
);


ALTER TABLE pago.trabajador_proyecto OWNER TO postgres;

SET search_path = plantilla, pg_catalog;

--
-- TOC entry 1829 (class 1259 OID 169826)
-- Dependencies: 2357 2358 10
-- Name: cargo; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE cargo (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    norma_juridicaid character varying(50),
    categoria_ocupacionalid character varying(50),
    nivel_preparacionid character varying(50),
    clasificacion_d_iid character varying(50),
    grupo_escalaid character varying(50),
    activo boolean DEFAULT true NOT NULL,
    nombre character varying(255) NOT NULL
);


ALTER TABLE plantilla.cargo OWNER TO postgres;

--
-- TOC entry 1831 (class 1259 OID 169847)
-- Dependencies: 2361 2362 10
-- Name: condecoracion; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE condecoracion (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    condecoracion_tipoid character varying(50),
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE plantilla.condecoracion OWNER TO postgres;

--
-- TOC entry 1830 (class 1259 OID 169838)
-- Dependencies: 2359 2360 10
-- Name: listado_cargos; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE listado_cargos (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    resolucionid character varying(50) NOT NULL,
    cargoid character varying(50) NOT NULL,
    areaid character varying(50) NOT NULL,
    cantidad_plazas integer NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    existencia integer
);


ALTER TABLE plantilla.listado_cargos OWNER TO postgres;

--
-- TOC entry 2593 (class 0 OID 0)
-- Dependencies: 1830
-- Name: TABLE listado_cargos; Type: COMMENT; Schema: plantilla; Owner: postgres
--

COMMENT ON TABLE listado_cargos IS 'p-2';


--
-- TOC entry 1833 (class 1259 OID 169864)
-- Dependencies: 2365 10
-- Name: oficial; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE oficial (
    trabajadorid character varying(50) NOT NULL,
    grado_militarid character varying(50),
    cargo_militarid character varying(50),
    fecha_ingreso date,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE plantilla.oficial OWNER TO postgres;

--
-- TOC entry 1826 (class 1259 OID 169798)
-- Dependencies: 2349 2350 10
-- Name: plantilla; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE plantilla (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    contratoid character varying(50) NOT NULL,
    listado_cargosid character varying(50) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    fpago_id character varying,
    spago_id character varying,
    htrabajo_id character varying
);


ALTER TABLE plantilla.plantilla OWNER TO postgres;

--
-- TOC entry 2594 (class 0 OID 0)
-- Dependencies: 1826
-- Name: TABLE plantilla; Type: COMMENT; Schema: plantilla; Owner: postgres
--

COMMENT ON TABLE plantilla IS 'p-4';


--
-- TOC entry 1832 (class 1259 OID 169852)
-- Dependencies: 2363 2364 10
-- Name: resolucion; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE resolucion (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre character(255) NOT NULL,
    anno integer NOT NULL,
    descripcion text,
    dir character varying(500),
    nombre_file character(200)
);


ALTER TABLE plantilla.resolucion OWNER TO postgres;

--
-- TOC entry 1827 (class 1259 OID 169803)
-- Dependencies: 2351 2352 2353 2354 10
-- Name: trabajador; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE trabajador (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    codigo_nomina integer NOT NULL,
    no_identidad character varying(11) NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido_1 character varying(50) NOT NULL,
    apellido_2 character varying(50) NOT NULL,
    fecha_nacimiento date NOT NULL,
    nombre_padre character varying(50) NOT NULL,
    estado_civilid character varying(50) NOT NULL,
    sexoid character varying(50) NOT NULL,
    color_pielid character varying(50) NOT NULL,
    estatura real,
    peso real,
    talla_camisa_blusa character varying(50),
    talla_pantalon_saya character varying(50),
    talla_zapato character varying(50),
    telefono character varying(20),
    repartoid character varying(50),
    lugar_procedenciaid character varying(50),
    direccion character varying(250),
    nivel_culturalid character varying(50),
    integracionid character varying(50),
    ubicacion_excepcionalid character varying(50),
    sancionado boolean NOT NULL,
    registro_militarid character varying(50),
    activo boolean DEFAULT true NOT NULL,
    nombre_madre character varying(50) NOT NULL,
    mbaja character varying DEFAULT 0,
    dbaja character varying DEFAULT 0,
    codigo integer,
    fecha_inicio date,
    tiempo integer,
    nombre_completo character varying,
    dia_de_baja date
);


ALTER TABLE plantilla.trabajador OWNER TO postgres;

--
-- TOC entry 2595 (class 0 OID 0)
-- Dependencies: 1827
-- Name: COLUMN trabajador.codigo_nomina; Type: COMMENT; Schema: plantilla; Owner: postgres
--

COMMENT ON COLUMN trabajador.codigo_nomina IS 'se calcula el ultimo que se de su area y se le suma uno';


--
-- TOC entry 1834 (class 1259 OID 169876)
-- Dependencies: 2366 2367 10
-- Name: trabajador_condecoracion; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE trabajador_condecoracion (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    trabajadorid character varying(50) NOT NULL,
    condecoracionid character varying(50) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE plantilla.trabajador_condecoracion OWNER TO postgres;

--
-- TOC entry 1835 (class 1259 OID 169894)
-- Dependencies: 2368 2369 10
-- Name: ubicacion_defensa; Type: TABLE; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE TABLE ubicacion_defensa (
    id character varying(50) DEFAULT clone.get_id() NOT NULL,
    ubicacion_defensa_tipoid character varying(50) NOT NULL,
    trabajadorid character varying(50) NOT NULL,
    activo character(255) DEFAULT 'ture'::bpchar NOT NULL
);


ALTER TABLE plantilla.ubicacion_defensa OWNER TO postgres;

SET search_path = utiles, pg_catalog;

--
-- TOC entry 1886 (class 1259 OID 179346)
-- Dependencies: 2375 2376 11
-- Name: update_time; Type: TABLE; Schema: utiles; Owner: postgres; Tablespace: 
--

CREATE TABLE update_time (
    id character varying DEFAULT clone.get_id() NOT NULL,
    update_mes boolean DEFAULT false
);


ALTER TABLE utiles.update_time OWNER TO postgres;

SET search_path = vistas_resumen, pg_catalog;

--
-- TOC entry 1839 (class 1259 OID 170905)
-- Dependencies: 2006 13
-- Name: agencia_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW agencia_vista AS
    SELECT area.id, agencia.nombre AS nombre_agencia, area.nombre FROM nomencladores.area, nomencladores.agencia WHERE ((area.agenciaid)::text = (agencia.id)::text);


ALTER TABLE vistas_resumen.agencia_vista OWNER TO postgres;

--
-- TOC entry 1840 (class 1259 OID 170909)
-- Dependencies: 2007 13
-- Name: agenciayempresas; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW agenciayempresas AS
    SELECT empresa.nombre AS empresaid, agencia.id, agencia.nombre, agencia.codigo FROM nomencladores.agencia, nomencladores.empresa WHERE ((agencia.empresaid)::text = (empresa.id)::text);


ALTER TABLE vistas_resumen.agenciayempresas OWNER TO postgres;

--
-- TOC entry 1841 (class 1259 OID 170913)
-- Dependencies: 2008 13
-- Name: anno_mes_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW anno_mes_vista AS
    SELECT anno_mes.id, anno.valor, mes.nombre FROM nomencladores.anno_mes, nomencladores.anno, nomencladores.mes WHERE (((anno_mes.annoid)::text = (anno.id)::text) AND ((anno_mes.mesid)::text = (mes.id)::text));


ALTER TABLE vistas_resumen.anno_mes_vista OWNER TO postgres;

--
-- TOC entry 1842 (class 1259 OID 170917)
-- Dependencies: 2009 13
-- Name: anno_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW anno_vista AS
    SELECT anno.id, anno.valor FROM nomencladores.anno;


ALTER TABLE vistas_resumen.anno_vista OWNER TO postgres;

--
-- TOC entry 1919 (class 1259 OID 179541)
-- Dependencies: 2085 13
-- Name: bajas_categorias; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW bajas_categorias AS
    SELECT dbajas.nombre AS dbajas, mbajas.nombre AS mbajas, count(trabajador.no_identidad) AS count FROM plantilla.trabajador, nomencladores.mbajas, nomencladores.dbajas WHERE (((trabajador.mbaja)::text = (mbajas.id)::text) AND ((trabajador.dbaja)::text = (dbajas.id)::text)) GROUP BY mbajas.nombre, dbajas.nombre;


ALTER TABLE vistas_resumen.bajas_categorias OWNER TO postgres;

--
-- TOC entry 1863 (class 1259 OID 171003)
-- Dependencies: 2030 13
-- Name: cargo_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW cargo_vista AS
    SELECT cargo.id, cargo.nombre, norma_juridica.nombre AS norma_juridica, categoria_ocupacional.nombre AS categoria_ocupacional, nivel_preparacion.nombre AS nivel_preparacion, clasificacion_d_i.noambre AS clasificacion, grupo_escala.nombre AS escala FROM plantilla.cargo, nomencladores.norma_juridica, nomencladores.categoria_ocupacional, nomencladores.nivel_preparacion, nomencladores.clasificacion_d_i, nomencladores.grupo_escala WHERE ((((((cargo.norma_juridicaid)::text = (norma_juridica.id)::text) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((cargo.nivel_preparacionid)::text = (nivel_preparacion.id)::text)) AND ((cargo.clasificacion_d_iid)::text = (clasificacion_d_i.id)::text)) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text));


ALTER TABLE vistas_resumen.cargo_vista OWNER TO postgres;

--
-- TOC entry 1864 (class 1259 OID 171007)
-- Dependencies: 2031 13
-- Name: cargos_listadodecargo_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW cargos_listadodecargo_vista AS
    SELECT cargo.nombre, listado_cargos.id FROM plantilla.listado_cargos, plantilla.cargo WHERE ((listado_cargos.cargoid)::text = (cargo.id)::text);


ALTER TABLE vistas_resumen.cargos_listadodecargo_vista OWNER TO postgres;

--
-- TOC entry 1855 (class 1259 OID 170969)
-- Dependencies: 2022 13
-- Name: clientesscontratoss; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW clientesscontratoss AS
    SELECT contratoooo.nombre, cliente.nombre AS clienteid, contratoooo.id FROM pago.contratoooo, pago.cliente WHERE ((contratoooo.clienteid)::text = (cliente.id)::text);


ALTER TABLE vistas_resumen.clientesscontratoss OWNER TO postgres;

--
-- TOC entry 1843 (class 1259 OID 170921)
-- Dependencies: 2010 13
-- Name: color_de_piel_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW color_de_piel_vista AS
    SELECT color_piel.id, color_piel.nombre FROM nomencladores.color_piel;


ALTER TABLE vistas_resumen.color_de_piel_vista OWNER TO postgres;

--
-- TOC entry 1883 (class 1259 OID 171127)
-- Dependencies: 2050 13
-- Name: completacion_pantilla; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW completacion_pantilla AS
    SELECT area.nombre, sum(listado_cargos.existencia) AS existencia, sum(listado_cargos.cantidad_plazas) AS cantidad_plazas, round((((count(contrato.id))::numeric / (sum(listado_cargos.cantidad_plazas))::numeric) * (100)::numeric), 1) AS por_ciento, count(contrato.id) AS trabajando, mujeres.woman, t_directos.directos, t_indirectos.indirectos, oficiales.oficial, indeteron.indeterminados, temporal.temporales, prueba.a_prueba, adiestra.adiestrados, dispo.disponibles, domi.domiciliar, operario.operarrios, tecnicos.tecnico, dirigentes.dirigente, administrativos.administrativo, servicios.servicio, sincategorias.sincategoria FROM ((((((((((((((((((((((((((nomencladores.categoria_ocupacional JOIN plantilla.cargo ON (((categoria_ocupacional.id)::text = (cargo.categoria_ocupacionalid)::text))) JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN nomencladores.contrato_tipo ON (((contrato_tipo.id)::text = (contrato.contrato_tipoid)::text))) JOIN nomencladores.clasificacion_d_i ON (((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text))) LEFT JOIN plantilla.trabajador ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) LEFT JOIN nomencladores.sexo ON (((sexo.id)::text = (trabajador.sexoid)::text))) LEFT JOIN plantilla.oficial ON (((trabajador.id)::text = (oficial.trabajadorid)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN (SELECT count(sexo.id) AS woman, area.id FROM (((((plantilla.listado_cargos LEFT JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) LEFT JOIN nomencladores.sexo ON (((sexo.id)::text = (trabajador.sexoid)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) WHERE ((sexo.id)::text = 'DE_capital_humano_756'::text) GROUP BY area.id) mujeres ON (((mujeres.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(clasificacion_d_i.noambre) AS directos, area.id FROM (((((nomencladores.clasificacion_d_i JOIN plantilla.cargo ON (((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text))) JOIN plantilla.listado_cargos ON (((cargo.id)::text = (listado_cargos.cargoid)::text))) JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) JOIN nomencladores.area ON (((area.id)::text = (listado_cargos.areaid)::text))) JOIN nomencladores.agencia ON (((agencia.id)::text = (area.agenciaid)::text))) WHERE ((clasificacion_d_i.id)::text = 'DE_capital_humano_782'::text) GROUP BY area.id) t_directos ON (((t_directos.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(clasificacion_d_i.noambre) AS indirectos, area.id FROM (((((nomencladores.clasificacion_d_i JOIN plantilla.cargo ON (((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text))) JOIN plantilla.listado_cargos ON (((cargo.id)::text = (listado_cargos.cargoid)::text))) JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) JOIN nomencladores.area ON (((area.id)::text = (listado_cargos.areaid)::text))) JOIN nomencladores.agencia ON (((agencia.id)::text = (area.agenciaid)::text))) WHERE ((clasificacion_d_i.id)::text = 'DE_capital_humano_783'::text) GROUP BY area.id) t_indirectos ON (((t_indirectos.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS oficial, area.id FROM plantilla.oficial, plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area WHERE ((((((trabajador.id)::text = (oficial.trabajadorid)::text) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) GROUP BY area.id) oficiales ON (((oficiales.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS indeterminados FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_766'::text)) GROUP BY area.id) indeteron ON (((indeteron.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS temporales FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_765'::text)) GROUP BY area.id) temporal ON (((temporal.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS a_prueba FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_767'::text)) GROUP BY area.id) prueba ON (((prueba.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS adiestrados FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1129'::text)) GROUP BY area.id) adiestra ON (((adiestra.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS disponibles FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1130'::text)) GROUP BY area.id) dispo ON (((dispo.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS domiciliar FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1131'::text)) GROUP BY area.id) domi ON (((domi.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS operarrios, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_768'::text)) GROUP BY area.id) operario ON (((operario.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS tecnico, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_770'::text)) GROUP BY area.id) tecnicos ON (((tecnicos.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS dirigente, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_771'::text)) GROUP BY area.id) dirigentes ON (((dirigentes.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS administrativo, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_818'::text)) GROUP BY area.id) administrativos ON (((administrativos.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS servicio, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_872'::text)) GROUP BY area.id) servicios ON (((servicios.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS sincategoria, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_931'::text)) GROUP BY area.id) sincategorias ON (((sincategorias.id)::text = (area.id)::text))) GROUP BY operario.operarrios, tecnicos.tecnico, dirigentes.dirigente, administrativos.administrativo, servicios.servicio, sincategorias.sincategoria, temporal.temporales, prueba.a_prueba, adiestra.adiestrados, dispo.disponibles, domi.domiciliar, area.nombre, mujeres.woman, indeteron.indeterminados, t_directos.directos, t_indirectos.indirectos, oficiales.oficial;


ALTER TABLE vistas_resumen.completacion_pantilla OWNER TO postgres;

--
-- TOC entry 1865 (class 1259 OID 171011)
-- Dependencies: 2032 13
-- Name: condecoracion_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW condecoracion_vista AS
    SELECT condecoracion_tipo.nombre, condecoracion.condecoracion_tipoid FROM nomencladores.condecoracion_tipo, plantilla.condecoracion WHERE ((condecoracion_tipo.id)::text = (condecoracion.condecoracion_tipoid)::text);


ALTER TABLE vistas_resumen.condecoracion_vista OWNER TO postgres;

--
-- TOC entry 1856 (class 1259 OID 170973)
-- Dependencies: 2023 13
-- Name: contratos_activos; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW contratos_activos AS
    SELECT contrato.fecha_final, contrato.id, contrato.fecha_inicio, trabajador.nombre_completo, contrato_tipo.nombre AS tipo_contrato FROM nomencladores.contrato_tipo, pago.contrato, plantilla.trabajador WHERE ((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND (contrato.activo = true));


ALTER TABLE vistas_resumen.contratos_activos OWNER TO postgres;

--
-- TOC entry 1881 (class 1259 OID 171110)
-- Dependencies: 2048 13
-- Name: dbajas; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW dbajas AS
    SELECT dbajas.id AS dbaja_id, dbajas.nombre AS dbajas_nombre FROM nomencladores.dbajas;


ALTER TABLE vistas_resumen.dbajas OWNER TO postgres;

--
-- TOC entry 1844 (class 1259 OID 170925)
-- Dependencies: 2011 13
-- Name: estado_civil_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW estado_civil_vista AS
    SELECT estado_civil.id, estado_civil.nombre FROM nomencladores.estado_civil;


ALTER TABLE vistas_resumen.estado_civil_vista OWNER TO postgres;

--
-- TOC entry 1857 (class 1259 OID 170977)
-- Dependencies: 2024 13
-- Name: historial_contratos; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW historial_contratos AS
    SELECT contrato.fecha_final, contrato.id, contrato.fecha_inicio, trabajador.nombre_completo, contrato_tipo.nombre AS tipo_contrato FROM nomencladores.contrato_tipo, pago.contrato, plantilla.trabajador WHERE ((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND (contrato.activo = false));


ALTER TABLE vistas_resumen.historial_contratos OWNER TO postgres;

--
-- TOC entry 1866 (class 1259 OID 171015)
-- Dependencies: 2033 13
-- Name: listado_de_cargos; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW listado_de_cargos AS
    SELECT listado_cargos.id, listado_cargos.existencia, listado_cargos.cantidad_plazas AS cant_plasas, cargo.nombre AS cargo, resolucion.nombre AS resolucion, area.nombre AS area FROM plantilla.listado_cargos, plantilla.resolucion, plantilla.cargo, nomencladores.area WHERE ((((listado_cargos.resolucionid)::text = (resolucion.id)::text) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text));


ALTER TABLE vistas_resumen.listado_de_cargos OWNER TO postgres;

--
-- TOC entry 1906 (class 1259 OID 179462)
-- Dependencies: 2072 13
-- Name: listado_ropa_trabajadores; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW listado_ropa_trabajadores AS
    SELECT sexo.nombre, trabajador.nombre_completo, blusas.valor AS blusa_camisa, pantalon.valor AS pantalon_salla, zapatos.valor AS zapatos FROM ((((plantilla.trabajador JOIN nomencladores.sexo ON (((trabajador.sexoid)::text = (sexo.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_camisa_blusa)::text = (talla.id)::text))) blusas ON (((blusas.id)::text = (trabajador.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_pantalon_saya)::text = (talla.id)::text))) pantalon ON (((pantalon.id)::text = (trabajador.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_zapato)::text = (talla.id)::text))) zapatos ON (((zapatos.id)::text = (trabajador.id)::text)));


ALTER TABLE vistas_resumen.listado_ropa_trabajadores OWNER TO postgres;

--
-- TOC entry 1908 (class 1259 OID 179472)
-- Dependencies: 2074 13
-- Name: listador_ropa_trabajadores_femeninos; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW listador_ropa_trabajadores_femeninos AS
    SELECT sexo.nombre, trabajador.nombre_completo, blusas.valor AS blusa_camisa, pantalon.valor AS pantalon_salla, zapatos.valor AS zapatos FROM ((((plantilla.trabajador JOIN nomencladores.sexo ON (((trabajador.sexoid)::text = (sexo.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_camisa_blusa)::text = (talla.id)::text))) blusas ON (((blusas.id)::text = (trabajador.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_pantalon_saya)::text = (talla.id)::text))) pantalon ON (((pantalon.id)::text = (trabajador.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_zapato)::text = (talla.id)::text))) zapatos ON (((zapatos.id)::text = (trabajador.id)::text))) WHERE ((sexo.id)::text = 'DE_capital_humano_756'::text);


ALTER TABLE vistas_resumen.listador_ropa_trabajadores_femeninos OWNER TO postgres;

--
-- TOC entry 1907 (class 1259 OID 179467)
-- Dependencies: 2073 13
-- Name: listador_ropa_trabajadores_masculinos; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW listador_ropa_trabajadores_masculinos AS
    SELECT sexo.nombre, trabajador.nombre_completo, blusas.valor AS blusa_camisa, pantalon.valor AS pantalon_salla, zapatos.valor AS zapatos FROM ((((plantilla.trabajador JOIN nomencladores.sexo ON (((trabajador.sexoid)::text = (sexo.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_camisa_blusa)::text = (talla.id)::text))) blusas ON (((blusas.id)::text = (trabajador.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_pantalon_saya)::text = (talla.id)::text))) pantalon ON (((pantalon.id)::text = (trabajador.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_zapato)::text = (talla.id)::text))) zapatos ON (((zapatos.id)::text = (trabajador.id)::text))) WHERE ((sexo.id)::text = 'DE_capital_humano_755'::text);


ALTER TABLE vistas_resumen.listador_ropa_trabajadores_masculinos OWNER TO postgres;

--
-- TOC entry 1845 (class 1259 OID 170929)
-- Dependencies: 2012 13
-- Name: lugar_procedencia_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW lugar_procedencia_vista AS
    SELECT lugar_procedencia.nombre, lugar_procedencia.id FROM nomencladores.lugar_procedencia;


ALTER TABLE vistas_resumen.lugar_procedencia_vista OWNER TO postgres;

--
-- TOC entry 1880 (class 1259 OID 171106)
-- Dependencies: 2047 13
-- Name: m_bajas; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW m_bajas AS
    SELECT mbajas.nombre AS mbajas, mbajas.id AS mbajas_id FROM nomencladores.mbajas;


ALTER TABLE vistas_resumen.m_bajas OWNER TO postgres;

--
-- TOC entry 1846 (class 1259 OID 170933)
-- Dependencies: 2013 13
-- Name: mes_anno_annomes_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW mes_anno_annomes_vista AS
    SELECT mes.nombre, anno_mes.id, anno.valor FROM nomencladores.anno_mes, nomencladores.mes, nomencladores.anno WHERE (((anno_mes.mesid)::text = (mes.id)::text) AND ((anno_mes.annoid)::text = (anno.id)::text));


ALTER TABLE vistas_resumen.mes_anno_annomes_vista OWNER TO postgres;

--
-- TOC entry 1847 (class 1259 OID 170937)
-- Dependencies: 2014 13
-- Name: mes_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW mes_vista AS
    SELECT mes.id, mes.nombre, mes.numero FROM nomencladores.mes;


ALTER TABLE vistas_resumen.mes_vista OWNER TO postgres;

--
-- TOC entry 1909 (class 1259 OID 179477)
-- Dependencies: 2075 13
-- Name: necesidad_de_blusas_camisas; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW necesidad_de_blusas_camisas AS
    SELECT sexo.nombre, blusas.valor AS blusa_camisa, count(blusas.valor) AS count FROM ((plantilla.trabajador JOIN nomencladores.sexo ON (((trabajador.sexoid)::text = (sexo.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_camisa_blusa)::text = (talla.id)::text))) blusas ON (((blusas.id)::text = (trabajador.id)::text))) GROUP BY sexo.nombre, blusas.valor ORDER BY sexo.nombre, blusas.valor;


ALTER TABLE vistas_resumen.necesidad_de_blusas_camisas OWNER TO postgres;

--
-- TOC entry 1910 (class 1259 OID 179482)
-- Dependencies: 2076 13
-- Name: necesidad_de_pantalon_saya; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW necesidad_de_pantalon_saya AS
    SELECT sexo.nombre, pantalon.valor, count(pantalon.valor) AS count FROM ((plantilla.trabajador JOIN nomencladores.sexo ON (((trabajador.sexoid)::text = (sexo.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_pantalon_saya)::text = (talla.id)::text))) pantalon ON (((pantalon.id)::text = (trabajador.id)::text))) GROUP BY sexo.nombre, pantalon.valor ORDER BY sexo.nombre, pantalon.valor;


ALTER TABLE vistas_resumen.necesidad_de_pantalon_saya OWNER TO postgres;

--
-- TOC entry 1911 (class 1259 OID 179487)
-- Dependencies: 2077 13
-- Name: necesidad_de_zapatos; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW necesidad_de_zapatos AS
    SELECT sexo.nombre, zapatos.valor, count(zapatos.valor) AS count FROM ((plantilla.trabajador JOIN nomencladores.sexo ON (((trabajador.sexoid)::text = (sexo.id)::text))) LEFT JOIN (SELECT talla_tipo.nombre, talla.valor, trabajador.id FROM nomencladores.talla, nomencladores.talla_tipo, plantilla.trabajador WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((trabajador.talla_zapato)::text = (talla.id)::text))) zapatos ON (((zapatos.id)::text = (trabajador.id)::text))) GROUP BY sexo.nombre, zapatos.valor ORDER BY sexo.nombre, zapatos.valor;


ALTER TABLE vistas_resumen.necesidad_de_zapatos OWNER TO postgres;

--
-- TOC entry 1867 (class 1259 OID 171019)
-- Dependencies: 2034 13
-- Name: oficialvista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW oficialvista AS
    SELECT cargo_militar.nombre AS cmilitar, grado_militar.nombre AS gmilitar, trabajador.nombre AS trabador, oficial.fecha_ingreso AS fecha, oficial.trabajadorid AS id, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo FROM nomencladores.cargo_militar, nomencladores.grado_militar, plantilla.oficial, plantilla.trabajador WHERE ((((cargo_militar.id)::text = (oficial.cargo_militarid)::text) AND ((grado_militar.id)::text = (oficial.grado_militarid)::text)) AND ((trabajador.id)::text = (oficial.trabajadorid)::text));


ALTER TABLE vistas_resumen.oficialvista OWNER TO postgres;

--
-- TOC entry 1888 (class 1259 OID 179372)
-- Dependencies: 2054 13
-- Name: plantila_cargos; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantila_cargos AS
    SELECT cargo.nombre AS cargo, (grupo_escala.salario + grupo_escala.pago_adicion) AS salario, sum(listado_cargos.cantidad_plazas) AS cant_plazas, grupo_escala.nombre, categoria_ocupacional.nombre AS categoria, ((grupo_escala.salario + grupo_escala.pago_adicion) * sum(listado_cargos.cantidad_plazas)) AS salario_total FROM plantilla.listado_cargos, plantilla.cargo, nomencladores.grupo_escala, nomencladores.categoria_ocupacional WHERE ((((listado_cargos.cargoid)::text = (cargo.id)::text) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) GROUP BY cargo.nombre, grupo_escala.salario, grupo_escala.pago_adicion, grupo_escala.nombre, categoria_ocupacional.nombre;


ALTER TABLE vistas_resumen.plantila_cargos OWNER TO postgres;

--
-- TOC entry 1891 (class 1259 OID 179386)
-- Dependencies: 2057 13
-- Name: plantila_x_cateoria; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantila_x_cateoria AS
    SELECT area.nombre AS area, contrato_tipo.nombre, mujeres.woman, trabajadores.trabajador, operarios.operarios, tecnicos.tecnicos, directivo.directivo, administrativo.administrativo, servicio.servicio, sin_categoria.sin_categoria, directos.directos, indirectos.indirectos, oficiales.oficiales, trabajadores.nacer AS nacimiento, date_part('days'::text, ((now() - (trabajadores.nacer)::timestamp with time zone) / (365)::double precision)) AS annos FROM ((((((((((((((((nomencladores.area JOIN plantilla.listado_cargos ON (((area.id)::text = (listado_cargos.areaid)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) JOIN nomencladores.contrato_tipo ON (((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text))) LEFT JOIN (SELECT count(sexo.id) AS woman, area.id, contrato.contrato_tipoid AS contrato FROM (((((plantilla.listado_cargos LEFT JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) LEFT JOIN nomencladores.sexo ON (((sexo.id)::text = (trabajador.sexoid)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) WHERE ((sexo.id)::text = 'DE_capital_humano_756'::text) GROUP BY area.id, contrato.contrato_tipoid) mujeres ON ((((mujeres.id)::text = (area.id)::text) AND ((mujeres.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS trabajador, trabajador.fecha_nacimiento AS nacer, area.id, contrato.contrato_tipoid AS contrato FROM (((((plantilla.listado_cargos LEFT JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) LEFT JOIN nomencladores.sexo ON (((sexo.id)::text = (trabajador.sexoid)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) GROUP BY area.id, contrato.contrato_tipoid, trabajador.fecha_nacimiento) trabajadores ON ((((trabajadores.id)::text = (area.id)::text) AND ((trabajadores.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS operarios, area.id, contrato.contrato_tipoid AS contrato FROM ((((((plantilla.cargo LEFT JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN nomencladores.categoria_ocupacional ON (((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text))) WHERE ((categoria_ocupacional.id)::text = 'DE_capital_humano_768'::text) GROUP BY area.id, categoria_ocupacional.nombre, contrato.contrato_tipoid, categoria_ocupacional.id, area.nombre ORDER BY area.nombre) operarios ON ((((operarios.id)::text = (area.id)::text) AND ((operarios.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS tecnicos, area.id, contrato.contrato_tipoid AS contrato FROM ((((((plantilla.cargo LEFT JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN nomencladores.categoria_ocupacional ON (((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text))) WHERE ((categoria_ocupacional.id)::text = 'DE_capital_humano_770'::text) GROUP BY area.id, categoria_ocupacional.nombre, contrato.contrato_tipoid, categoria_ocupacional.id, area.nombre ORDER BY area.nombre) tecnicos ON ((((tecnicos.id)::text = (area.id)::text) AND ((tecnicos.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS directivo, area.id, contrato.contrato_tipoid AS contrato FROM ((((((plantilla.cargo LEFT JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN nomencladores.categoria_ocupacional ON (((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text))) WHERE ((categoria_ocupacional.id)::text = 'DE_capital_humano_771'::text) GROUP BY area.id, categoria_ocupacional.nombre, contrato.contrato_tipoid, categoria_ocupacional.id, area.nombre ORDER BY area.nombre) directivo ON ((((directivo.id)::text = (area.id)::text) AND ((directivo.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS administrativo, area.id, contrato.contrato_tipoid AS contrato FROM ((((((plantilla.cargo LEFT JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN nomencladores.categoria_ocupacional ON (((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text))) WHERE ((categoria_ocupacional.id)::text = 'DE_capital_humano_818'::text) GROUP BY area.id, categoria_ocupacional.nombre, contrato.contrato_tipoid, categoria_ocupacional.id, area.nombre ORDER BY area.nombre) administrativo ON ((((administrativo.id)::text = (area.id)::text) AND ((administrativo.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS servicio, area.id, contrato.contrato_tipoid AS contrato FROM ((((((plantilla.cargo LEFT JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN nomencladores.categoria_ocupacional ON (((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text))) WHERE ((categoria_ocupacional.id)::text = 'DE_capital_humano_818'::text) GROUP BY area.id, categoria_ocupacional.nombre, contrato.contrato_tipoid, categoria_ocupacional.id, area.nombre ORDER BY area.nombre) servicio ON ((((servicio.id)::text = (area.id)::text) AND ((servicio.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS sin_categoria, area.id, contrato.contrato_tipoid AS contrato FROM ((((((plantilla.cargo LEFT JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN nomencladores.categoria_ocupacional ON (((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text))) WHERE ((categoria_ocupacional.id)::text = 'DE_capital_humano_818'::text) GROUP BY area.id, categoria_ocupacional.nombre, contrato.contrato_tipoid, categoria_ocupacional.id, area.nombre ORDER BY area.nombre) sin_categoria ON ((((sin_categoria.id)::text = (area.id)::text) AND ((sin_categoria.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS directos, contrato.contrato_tipoid AS contrato, area.id FROM ((((((plantilla.cargo LEFT JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN nomencladores.clasificacion_d_i ON (((cargo.clasificacion_d_iid)::text = (clasificacion_d_i.id)::text))) WHERE ((clasificacion_d_i.id)::text = 'DE_capital_humano_782'::text) GROUP BY area.id, area.nombre, contrato.contrato_tipoid ORDER BY area.nombre) directos ON ((((directos.id)::text = (area.id)::text) AND ((directos.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS indirectos, contrato.contrato_tipoid AS contrato, area.id FROM ((((((plantilla.cargo LEFT JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN nomencladores.clasificacion_d_i ON (((cargo.clasificacion_d_iid)::text = (clasificacion_d_i.id)::text))) WHERE ((clasificacion_d_i.id)::text = 'DE_capital_humano_783'::text) GROUP BY area.id, area.nombre, contrato.contrato_tipoid ORDER BY area.nombre) indirectos ON ((((indirectos.id)::text = (area.id)::text) AND ((indirectos.contrato)::text = (contrato.contrato_tipoid)::text)))) LEFT JOIN (SELECT count(trabajador.id) AS oficiales, area.id, contrato.contrato_tipoid AS contrato FROM plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, plantilla.trabajador, nomencladores.area, plantilla.oficial WHERE (((((((listado_cargos.cargoid)::text = (cargo.id)::text) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) AND ((oficial.trabajadorid)::text = (trabajador.id)::text)) GROUP BY area.id, contrato.contrato_tipoid) oficiales ON ((((oficiales.id)::text = (area.id)::text) AND ((oficiales.contrato)::text = (contrato.contrato_tipoid)::text)))) GROUP BY area.nombre, trabajadores.nacer, contrato_tipo.nombre, area.id, mujeres.woman, trabajadores.trabajador, operarios.operarios, tecnicos.tecnicos, directivo.directivo, administrativo.administrativo, servicio.servicio, sin_categoria.sin_categoria, directos.directos, indirectos.indirectos, oficiales.oficiales ORDER BY area.id;


ALTER TABLE vistas_resumen.plantila_x_cateoria OWNER TO postgres;

--
-- TOC entry 1872 (class 1259 OID 171047)
-- Dependencies: 2039 13
-- Name: plantilla; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla AS
    SELECT ubicacion_defensa_tipo.nombre AS ubicacion, lugar_procedencia.nombre AS procedencia, ubicacion_defensa.ubicacion_defensa_tipoid AS idubicacion, contrato_tipo.nombre AS tipo_contrato, area.nombre AS area, agencia.nombre AS agencia, agencia.empresaid AS empresa, listado_cargos.areaid, area.agenciaid, cargo.nombre AS cargo, contrato.contrato_tipoid, contrato.trabajadorid, plantilla.listado_cargosid, trabajador.lugar_procedenciaid, trabajador.nombre, trabajador.apellido_1 AS apellido, trabajador.apellido_2 AS apellido_s, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, trabajador.no_identidad AS identidad, trabajador.fecha_nacimiento AS fnacimiento, trabajador.direccion AS dir, contrato.fecha_inicio, contrato.fecha_final FROM ((((((((((plantilla.trabajador JOIN pago.contrato ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) JOIN plantilla.plantilla ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.ubicacion_defensa ON (((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text))) LEFT JOIN nomencladores.ubicacion_defensa_tipo ON (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text))) JOIN nomencladores.lugar_procedencia ON (((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) JOIN nomencladores.agencia ON (((area.agenciaid)::text = (agencia.id)::text))) JOIN nomencladores.contrato_tipo ON (((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)));


ALTER TABLE vistas_resumen.plantilla OWNER TO postgres;

--
-- TOC entry 1892 (class 1259 OID 179391)
-- Dependencies: 2058 13
-- Name: plantilla_caorgos_unidad; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_caorgos_unidad AS
    SELECT grupo_escala.pago_adicion AS adicional, grupo_escala.salario, (grupo_escala.pago_adicion + grupo_escala.salario) AS total, grupo_escala.nombre AS escala, nivel_preparacion.nombre AS preparacion, clasificacion_d_i.noambre AS clacificacion, categoria_ocupacional.nombre AS categoria, area.nombre AS area, cargo.nombre AS cargo, trabajador.nombre_completo AS nombre, count(trabajador.id) AS cantidad FROM plantilla.cargo, plantilla.listado_cargos, nomencladores.area, nomencladores.categoria_ocupacional, nomencladores.clasificacion_d_i, nomencladores.nivel_preparacion, nomencladores.grupo_escala, plantilla.trabajador, pago.contrato, plantilla.plantilla WHERE ((((((((((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text) AND ((cargo.nivel_preparacionid)::text = (nivel_preparacion.id)::text)) AND ((cargo.clasificacion_d_iid)::text = (clasificacion_d_i.id)::text)) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((plantilla.contratoid)::text = (contrato.id)::text)) GROUP BY area.nombre, grupo_escala.pago_adicion, grupo_escala.salario, grupo_escala.nombre, nivel_preparacion.nombre, clasificacion_d_i.noambre, categoria_ocupacional.nombre, cargo.nombre, trabajador.nombre_completo;


ALTER TABLE vistas_resumen.plantilla_caorgos_unidad OWNER TO postgres;

--
-- TOC entry 1889 (class 1259 OID 179376)
-- Dependencies: 2055 13
-- Name: plantilla_cargos_area; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_cargos_area AS
    SELECT agencia.nombre AS agencia, area.nombre AS area, cargo.nombre AS cargo, (grupo_escala.salario + grupo_escala.pago_adicion) AS salario, sum(listado_cargos.cantidad_plazas) AS cant_plazas, grupo_escala.nombre AS escala, categoria_ocupacional.nombre AS categoria, ((grupo_escala.salario + grupo_escala.pago_adicion) * sum(listado_cargos.cantidad_plazas)) AS salario_total FROM plantilla.listado_cargos, plantilla.cargo, nomencladores.area, nomencladores.grupo_escala, nomencladores.categoria_ocupacional, nomencladores.agencia WHERE ((((((listado_cargos.cargoid)::text = (cargo.id)::text) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((area.agenciaid)::text = (agencia.id)::text)) GROUP BY cargo.nombre, grupo_escala.salario, grupo_escala.pago_adicion, grupo_escala.nombre, categoria_ocupacional.nombre, area.nombre, agencia.nombre ORDER BY area.nombre;


ALTER TABLE vistas_resumen.plantilla_cargos_area OWNER TO postgres;

--
-- TOC entry 1890 (class 1259 OID 179381)
-- Dependencies: 2056 13
-- Name: plantilla_cargos_unidad; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_cargos_unidad AS
    SELECT agencia.nombre AS agencia, cargo.nombre AS cargo, (grupo_escala.salario + grupo_escala.pago_adicion) AS salario, sum(listado_cargos.cantidad_plazas) AS cant_plazas, grupo_escala.nombre AS escala, categoria_ocupacional.nombre AS categoria, ((grupo_escala.salario + grupo_escala.pago_adicion) * sum(listado_cargos.cantidad_plazas)) AS salario_total FROM plantilla.listado_cargos, plantilla.cargo, nomencladores.area, nomencladores.grupo_escala, nomencladores.categoria_ocupacional, nomencladores.agencia WHERE ((((((listado_cargos.cargoid)::text = (cargo.id)::text) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((area.agenciaid)::text = (agencia.id)::text)) GROUP BY cargo.nombre, grupo_escala.salario, grupo_escala.pago_adicion, grupo_escala.nombre, categoria_ocupacional.nombre, agencia.nombre ORDER BY agencia.nombre;


ALTER TABLE vistas_resumen.plantilla_cargos_unidad OWNER TO postgres;

--
-- TOC entry 1895 (class 1259 OID 179407)
-- Dependencies: 2061 13
-- Name: plantilla_ocupada; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_ocupada AS
    SELECT trabajador.nombre_completo AS nombre, area.nombre AS area, agencia.nombre AS agencia, cargo.nombre AS cargo, grupo_escala.nombre AS escala, grupo_escala.salario AS salario_base, grupo_escala.pago_adicion AS adicional, (grupo_escala.salario + grupo_escala.pago_adicion) AS total, categoria_ocupacional.nombre AS categoria FROM plantilla.plantilla, pago.contrato, plantilla.trabajador, plantilla.listado_cargos, nomencladores.area, nomencladores.agencia, plantilla.cargo, nomencladores.grupo_escala, nomencladores.categoria_ocupacional WHERE (((((((((plantilla.listado_cargosid)::text = (listado_cargos.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((area.agenciaid)::text = (agencia.id)::text)) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((categoria_ocupacional.id)::text = (cargo.categoria_ocupacionalid)::text)) ORDER BY area.nombre, agencia.nombre, categoria_ocupacional.nombre;


ALTER TABLE vistas_resumen.plantilla_ocupada OWNER TO postgres;

--
-- TOC entry 1885 (class 1259 OID 171143)
-- Dependencies: 2052 13
-- Name: plantilla_p2; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_p2 AS
    SELECT trabajador.nombre_completo AS nombre, area.nombre AS area, cargo.nombre AS cargo, categoria_ocupacional.nombre AS categoria, clasificacion_d_i.noambre AS clacificacion, grupo_escala.pago_adicion AS pago_adicional, grupo_escala.salario, grupo_escala.nombre AS escala FROM plantilla.plantilla, nomencladores.clasificacion_d_i, nomencladores.categoria_ocupacional, plantilla.cargo, nomencladores.grupo_escala, plantilla.trabajador, pago.contrato, plantilla.listado_cargos, nomencladores.area WHERE (((((((((plantilla.contratoid)::text = (contrato.id)::text) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text)) AND ((categoria_ocupacional.id)::text = (cargo.categoria_ocupacionalid)::text)) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) ORDER BY area.id;


ALTER TABLE vistas_resumen.plantilla_p2 OWNER TO postgres;

--
-- TOC entry 1887 (class 1259 OID 179367)
-- Dependencies: 2053 13
-- Name: plantilla_p2_actual; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_p2_actual AS
    SELECT trabajador.nombre_completo AS nombre, area.nombre AS area, cargo.nombre AS cargo, categoria_ocupacional.nombre AS categoria, clasificacion_d_i.noambre AS clacificacion, grupo_escala.pago_adicion AS pago_adicional, grupo_escala.salario, grupo_escala.nombre AS escala, (trabajador.tiempo / 12) AS tiempo, contrato_tipo.id AS contrato FROM plantilla.plantilla, nomencladores.clasificacion_d_i, nomencladores.categoria_ocupacional, plantilla.cargo, nomencladores.grupo_escala, plantilla.trabajador, pago.contrato, nomencladores.contrato_tipo, plantilla.listado_cargos, nomencladores.area WHERE ((((((((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((plantilla.contratoid)::text = (contrato.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text)) AND ((categoria_ocupacional.id)::text = (cargo.categoria_ocupacionalid)::text)) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) ORDER BY area.id;


ALTER TABLE vistas_resumen.plantilla_p2_actual OWNER TO postgres;

--
-- TOC entry 1893 (class 1259 OID 179396)
-- Dependencies: 2059 13
-- Name: plantilla_unidad_area; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_unidad_area AS
    SELECT agencia.nombre AS agencia, area.nombre, cargo.nombre AS cargo, (grupo_escala.salario + grupo_escala.pago_adicion) AS salario, sum(listado_cargos.cantidad_plazas) AS cant_plazas, grupo_escala.nombre AS escala, categoria_ocupacional.nombre AS categoria, ((grupo_escala.salario + grupo_escala.pago_adicion) * sum(listado_cargos.cantidad_plazas)) AS salario_total, contrato.fecha_inicio, contrato.fecha_final, trabajador.nombre_completo, grupo_escala.pago_adicion FROM plantilla.listado_cargos, plantilla.cargo, nomencladores.area, nomencladores.grupo_escala, nomencladores.categoria_ocupacional, nomencladores.agencia, plantilla.plantilla, pago.contrato, plantilla.trabajador WHERE (((((((((listado_cargos.cargoid)::text = (cargo.id)::text) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((area.agenciaid)::text = (agencia.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((plantilla.contratoid)::text = (contrato.id)::text)) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) GROUP BY cargo.nombre, grupo_escala.salario, grupo_escala.pago_adicion, grupo_escala.nombre, categoria_ocupacional.nombre, agencia.nombre, area.nombre, contrato.fecha_inicio, contrato.fecha_final, trabajador.nombre_completo ORDER BY agencia.nombre, area.nombre;


ALTER TABLE vistas_resumen.plantilla_unidad_area OWNER TO postgres;

--
-- TOC entry 1894 (class 1259 OID 179403)
-- Dependencies: 2060 13
-- Name: plantilla_vacante; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_vacante AS
    SELECT listado_cargos.existencia, listado_cargos.cantidad_plazas AS cant_plasa, cargo.nombre AS cargo, area.nombre AS area, agencia.nombre AS agencia, grupo_escala.salario AS salario_base, grupo_escala.pago_adicion AS adicional, (grupo_escala.salario + grupo_escala.pago_adicion) AS salario_total, grupo_escala.nombre FROM nomencladores.agencia, nomencladores.area, plantilla.cargo, plantilla.listado_cargos, nomencladores.grupo_escala WHERE ((((((area.agenciaid)::text = (agencia.id)::text) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND (listado_cargos.existencia > 0)) ORDER BY area.nombre;


ALTER TABLE vistas_resumen.plantilla_vacante OWNER TO postgres;

--
-- TOC entry 1868 (class 1259 OID 171023)
-- Dependencies: 2035 13
-- Name: plantilla_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_vista AS
    SELECT plantilla.id, plantilla.listado_cargosid AS cargo_id, trabajador.nombre AS trabajador, trabajador.id AS trabajadorid, trabajador.apellido_1 AS p_apellido, trabajador.apellido_2 AS s_apellido, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, contrato_tipo.nombre, contrato_tipo.id AS contrato_id, cargo.nombre AS cargo, contrato.id AS contrato_tabla_id, horario_trabajo.tipo AS horario, forma_pago.nombre AS nombref, sistema_pago.nombre AS nombresist FROM ((((((((plantilla.plantilla JOIN nomencladores.horario_trabajo ON (((plantilla.htrabajo_id)::text = (horario_trabajo.id)::text))) JOIN nomencladores.forma_pago ON (((plantilla.fpago_id)::text = (forma_pago.id)::text))) JOIN nomencladores.sistema_pago ON (((plantilla.spago_id)::text = (sistema_pago.id)::text))) JOIN pago.contrato ON (((plantilla.contratoid)::text = (contrato.id)::text))) JOIN nomencladores.contrato_tipo ON (((contrato_tipo.id)::text = (contrato.contrato_tipoid)::text))) JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text)));


ALTER TABLE vistas_resumen.plantilla_vista OWNER TO postgres;

--
-- TOC entry 1884 (class 1259 OID 171134)
-- Dependencies: 2051 13
-- Name: plantilla_x_cotrato; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW plantilla_x_cotrato AS
    SELECT area.nombre, sum(listado_cargos.cantidad_plazas) AS cantidad_plazas, count(contrato.id) AS trabajando, round((((count(contrato.id))::numeric / (sum(listado_cargos.cantidad_plazas))::numeric) * (100)::numeric), 2) AS por_ciento, indeteron.indeterminados, temporal.temporales, prueba.a_prueba, adiestra.adiestrados, dispo.disponibles, domi.domiciliar FROM ((((((((((((((((((((((((((nomencladores.categoria_ocupacional JOIN plantilla.cargo ON (((categoria_ocupacional.id)::text = (cargo.categoria_ocupacionalid)::text))) JOIN plantilla.listado_cargos ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) LEFT JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN nomencladores.contrato_tipo ON (((contrato_tipo.id)::text = (contrato.contrato_tipoid)::text))) JOIN nomencladores.clasificacion_d_i ON (((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text))) LEFT JOIN plantilla.trabajador ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) LEFT JOIN nomencladores.sexo ON (((sexo.id)::text = (trabajador.sexoid)::text))) LEFT JOIN plantilla.oficial ON (((trabajador.id)::text = (oficial.trabajadorid)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) LEFT JOIN (SELECT count(sexo.id) AS woman, area.id FROM (((((plantilla.listado_cargos LEFT JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) LEFT JOIN pago.contrato ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.trabajador ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) LEFT JOIN nomencladores.sexo ON (((sexo.id)::text = (trabajador.sexoid)::text))) LEFT JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) WHERE ((sexo.id)::text = 'DE_capital_humano_756'::text) GROUP BY area.id) mujeres ON (((mujeres.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(clasificacion_d_i.noambre) AS directos, area.id FROM (((((nomencladores.clasificacion_d_i JOIN plantilla.cargo ON (((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text))) JOIN plantilla.listado_cargos ON (((cargo.id)::text = (listado_cargos.cargoid)::text))) JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) JOIN nomencladores.area ON (((area.id)::text = (listado_cargos.areaid)::text))) JOIN nomencladores.agencia ON (((agencia.id)::text = (area.agenciaid)::text))) WHERE ((clasificacion_d_i.id)::text = 'DE_capital_humano_782'::text) GROUP BY area.id) t_directos ON (((t_directos.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(clasificacion_d_i.noambre) AS indirectos, area.id FROM (((((nomencladores.clasificacion_d_i JOIN plantilla.cargo ON (((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text))) JOIN plantilla.listado_cargos ON (((cargo.id)::text = (listado_cargos.cargoid)::text))) JOIN plantilla.plantilla ON (((listado_cargos.id)::text = (plantilla.listado_cargosid)::text))) JOIN nomencladores.area ON (((area.id)::text = (listado_cargos.areaid)::text))) JOIN nomencladores.agencia ON (((agencia.id)::text = (area.agenciaid)::text))) WHERE ((clasificacion_d_i.id)::text = 'DE_capital_humano_783'::text) GROUP BY area.id) t_indirectos ON (((t_indirectos.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS oficial, area.id FROM plantilla.oficial, plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area WHERE ((((((trabajador.id)::text = (oficial.trabajadorid)::text) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) GROUP BY area.id) oficiales ON (((oficiales.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS indeterminados FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_766'::text)) GROUP BY area.id) indeteron ON (((indeteron.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS temporales FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_765'::text)) GROUP BY area.id) temporal ON (((temporal.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS a_prueba FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_767'::text)) GROUP BY area.id) prueba ON (((prueba.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS adiestrados FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1129'::text)) GROUP BY area.id) adiestra ON (((adiestra.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS disponibles FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1130'::text)) GROUP BY area.id) dispo ON (((dispo.id)::text = (area.id)::text))) LEFT JOIN (SELECT area.id, count(trabajador.nombre) AS domiciliar FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo WHERE (((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1131'::text)) GROUP BY area.id) domi ON (((domi.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS operarrios, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_768'::text)) GROUP BY area.id) operario ON (((operario.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS tecnico, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_770'::text)) GROUP BY area.id) tecnicos ON (((tecnicos.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS dirigente, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_771'::text)) GROUP BY area.id) dirigentes ON (((dirigentes.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS administrativo, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_818'::text)) GROUP BY area.id) administrativos ON (((administrativos.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS servicio, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_872'::text)) GROUP BY area.id) servicios ON (((servicios.id)::text = (area.id)::text))) LEFT JOIN (SELECT count(trabajador.nombre) AS sincategoria, area.id FROM plantilla.trabajador, pago.contrato, plantilla.plantilla, plantilla.listado_cargos, nomencladores.area, nomencladores.contrato_tipo, nomencladores.categoria_ocupacional, plantilla.cargo WHERE (((((((((contrato.trabajadorid)::text = (trabajador.id)::text) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((categoria_ocupacional.id)::text = 'DE_capital_humano_931'::text)) GROUP BY area.id) sincategorias ON (((sincategorias.id)::text = (area.id)::text))) GROUP BY operario.operarrios, tecnicos.tecnico, dirigentes.dirigente, administrativos.administrativo, servicios.servicio, sincategorias.sincategoria, temporal.temporales, prueba.a_prueba, adiestra.adiestrados, dispo.disponibles, domi.domiciliar, area.nombre, mujeres.woman, indeteron.indeterminados, t_directos.directos, t_indirectos.indirectos, oficiales.oficial;


ALTER TABLE vistas_resumen.plantilla_x_cotrato OWNER TO postgres;

--
-- TOC entry 1858 (class 1259 OID 170981)
-- Dependencies: 2025 13
-- Name: proyecto_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW proyecto_vista AS
    SELECT proyecto.id, proyecto.monto, proyecto.nombre, proyecto.descripcion, area.nombre AS area, proyecto.codigo, proyecto.fecha_inicio, proyecto.fecha_fin, contratoooo.nombre AS contratoooo FROM pago.proyecto, nomencladores.area, pago.contratoooo WHERE (((proyecto.areaid)::text = (area.id)::text) AND ((proyecto.contratooooid)::text = (contratoooo.id)::text));


ALTER TABLE vistas_resumen.proyecto_vista OWNER TO postgres;

--
-- TOC entry 1859 (class 1259 OID 170985)
-- Dependencies: 2026 13
-- Name: proyectotodo_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW proyectotodo_vista AS
    SELECT proyecto.id, proyecto.monto, proyecto.nombre, proyecto.descripcion, proyecto.areaid, proyecto.codigo, proyecto.contratooooid, proyecto.activo FROM pago.proyecto;


ALTER TABLE vistas_resumen.proyectotodo_vista OWNER TO postgres;

--
-- TOC entry 1848 (class 1259 OID 170941)
-- Dependencies: 2015 13
-- Name: registro_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW registro_vista AS
    SELECT registro_militar.id, registro_militar.nombre FROM nomencladores.registro_militar;


ALTER TABLE vistas_resumen.registro_vista OWNER TO postgres;

--
-- TOC entry 1849 (class 1259 OID 170945)
-- Dependencies: 2016 13
-- Name: reparto_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW reparto_vista AS
    SELECT reparto.id, reparto.nombre FROM nomencladores.reparto;


ALTER TABLE vistas_resumen.reparto_vista OWNER TO postgres;

--
-- TOC entry 1860 (class 1259 OID 170989)
-- Dependencies: 2027 13
-- Name: reporte_pago_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW reporte_pago_vista AS
    SELECT reporte_pago.id, reporte_pago.nombre, proyecto.nombre AS proyecto, mes.nombre AS mes, anno.valor AS anno FROM pago.reporte_pago, pago.proyecto, nomencladores.anno_mes, nomencladores.mes, nomencladores.anno WHERE (((((reporte_pago.proyectoid)::text = (proyecto.id)::text) AND ((reporte_pago.anno_mesid)::text = (anno_mes.id)::text)) AND ((anno_mes.annoid)::text = (anno.id)::text)) AND ((anno_mes.mesid)::text = (mes.id)::text));


ALTER TABLE vistas_resumen.reporte_pago_vista OWNER TO postgres;

--
-- TOC entry 1914 (class 1259 OID 179516)
-- Dependencies: 2080 13
-- Name: segun_antiguedad; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW segun_antiguedad AS
    SELECT trabajador.nombre_completo AS nombre, area.nombre AS area, cargo.nombre AS cargo, categoria_ocupacional.nombre AS categoria, clasificacion_d_i.noambre AS clacificacion, grupo_escala.pago_adicion AS pago_adicional, grupo_escala.salario, grupo_escala.nombre AS escala, (trabajador.tiempo / 12) AS tiempo, contrato_tipo.nombre AS contrato, contrato_tipo.id AS contrato_id, date_part('days'::text, ((now() - (trabajador.fecha_nacimiento)::timestamp with time zone) / (365)::double precision)) AS edad, trabajador.fecha_inicio, trabajador.fecha_nacimiento FROM plantilla.plantilla, nomencladores.clasificacion_d_i, nomencladores.categoria_ocupacional, plantilla.cargo, nomencladores.grupo_escala, plantilla.trabajador, pago.contrato, nomencladores.contrato_tipo, plantilla.listado_cargos, nomencladores.area WHERE ((((((((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((plantilla.contratoid)::text = (contrato.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((clasificacion_d_i.id)::text = (cargo.clasificacion_d_iid)::text)) AND ((categoria_ocupacional.id)::text = (cargo.categoria_ocupacionalid)::text)) AND ((cargo.grupo_escalaid)::text = (grupo_escala.id)::text)) AND ((contrato.trabajadorid)::text = (trabajador.id)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((listado_cargos.areaid)::text = (area.id)::text)) ORDER BY area.id;


ALTER TABLE vistas_resumen.segun_antiguedad OWNER TO postgres;

--
-- TOC entry 1850 (class 1259 OID 170949)
-- Dependencies: 2017 13
-- Name: sexo_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW sexo_vista AS
    SELECT sexo.id, sexo.nombre FROM nomencladores.sexo;


ALTER TABLE vistas_resumen.sexo_vista OWNER TO postgres;

--
-- TOC entry 1851 (class 1259 OID 170953)
-- Dependencies: 2018 13
-- Name: talla_camisablusa_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW talla_camisablusa_vista AS
    SELECT talla.valor, talla.id FROM nomencladores.talla, nomencladores.talla_tipo WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((talla_tipo.nombre)::text = 'camisa.blusa'::text));


ALTER TABLE vistas_resumen.talla_camisablusa_vista OWNER TO postgres;

--
-- TOC entry 1852 (class 1259 OID 170957)
-- Dependencies: 2019 13
-- Name: talla_pantalonsaya_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW talla_pantalonsaya_vista AS
    SELECT talla.valor, talla.id FROM nomencladores.talla, nomencladores.talla_tipo WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((talla_tipo.nombre)::text = 'pantalon.salla'::text));


ALTER TABLE vistas_resumen.talla_pantalonsaya_vista OWNER TO postgres;

--
-- TOC entry 1853 (class 1259 OID 170961)
-- Dependencies: 2020 13
-- Name: talla_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW talla_vista AS
    SELECT talla.id, talla.valor, talla_tipo.nombre FROM nomencladores.talla_tipo, nomencladores.talla WHERE ((talla_tipo.id)::text = (talla.talla_tipoid)::text);


ALTER TABLE vistas_resumen.talla_vista OWNER TO postgres;

--
-- TOC entry 1854 (class 1259 OID 170965)
-- Dependencies: 2021 13
-- Name: talla_zapato_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW talla_zapato_vista AS
    SELECT talla.valor, talla.id FROM nomencladores.talla, nomencladores.talla_tipo WHERE (((talla.talla_tipoid)::text = (talla_tipo.id)::text) AND ((talla_tipo.nombre)::text = 'zapato'::text));


ALTER TABLE vistas_resumen.talla_zapato_vista OWNER TO postgres;

--
-- TOC entry 1896 (class 1259 OID 179412)
-- Dependencies: 2062 13
-- Name: tarbajador_sin_categoria; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW tarbajador_sin_categoria AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.integracionid)::text = 'DE_capital_humano_1221'::text));


ALTER TABLE vistas_resumen.tarbajador_sin_categoria OWNER TO postgres;

--
-- TOC entry 1918 (class 1259 OID 179536)
-- Dependencies: 2084 13
-- Name: todas_bajas; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW todas_bajas AS
    SELECT dbajas.nombre AS dbajas, mbajas.nombre AS mbajas, trabajador.no_identidad, date_part('days'::text, ((now() - (trabajador.fecha_nacimiento)::timestamp with time zone) / (365)::double precision)) AS edad, trabajador.telefono AS tele, trabajador.fecha_inicio AS inicio, trabajador.dia_de_baja AS final, trabajador.nombre_completo AS nombre FROM plantilla.trabajador, nomencladores.mbajas, nomencladores.dbajas WHERE (((trabajador.mbaja)::text = (mbajas.id)::text) AND ((trabajador.dbaja)::text = (dbajas.id)::text));


ALTER TABLE vistas_resumen.todas_bajas OWNER TO postgres;

--
-- TOC entry 1869 (class 1259 OID 171028)
-- Dependencies: 2036 13
-- Name: trabajador_condec_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_condec_vista AS
    SELECT trabajador_condecoracion.id, trabajador.nombre AS nombretrab, condecoracion_tipo.nombre AS nombrecond, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo FROM nomencladores.condecoracion_tipo, plantilla.condecoracion, plantilla.trabajador, plantilla.trabajador_condecoracion WHERE ((((trabajador.id)::text = (trabajador_condecoracion.trabajadorid)::text) AND ((trabajador_condecoracion.condecoracionid)::text = (condecoracion.id)::text)) AND ((condecoracion.condecoracion_tipoid)::text = (condecoracion_tipo.id)::text));


ALTER TABLE vistas_resumen.trabajador_condec_vista OWNER TO postgres;

--
-- TOC entry 1874 (class 1259 OID 171057)
-- Dependencies: 2041 13
-- Name: trabajador_contrato_a_prueba; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_contrato_a_prueba AS
    SELECT ubicacion_defensa_tipo.nombre AS ubicacion, lugar_procedencia.nombre AS procedencia, ubicacion_defensa.ubicacion_defensa_tipoid AS idubicacion, contrato_tipo.nombre AS tipo_contrato, area.nombre AS area, agencia.nombre AS agencia, agencia.empresaid AS empresa, listado_cargos.areaid, area.agenciaid, cargo.nombre AS cargo, contrato.contrato_tipoid, contrato.trabajadorid, plantilla.listado_cargosid, trabajador.lugar_procedenciaid, trabajador.nombre, trabajador.apellido_1 AS apellido, trabajador.apellido_2 AS apellido_s, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, trabajador.no_identidad AS identidad, trabajador.fecha_nacimiento AS fnacimiento, contrato.fecha_inicio, contrato.fecha_final, trabajador.direccion AS dir FROM ((((((((((plantilla.trabajador JOIN pago.contrato ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) JOIN plantilla.plantilla ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.ubicacion_defensa ON (((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text))) LEFT JOIN nomencladores.ubicacion_defensa_tipo ON (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text))) JOIN nomencladores.lugar_procedencia ON (((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) JOIN nomencladores.agencia ON (((area.agenciaid)::text = (agencia.id)::text))) JOIN nomencladores.contrato_tipo ON ((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((contrato_tipo.id)::text = 'DE_capital_humano_767'::text))));


ALTER TABLE vistas_resumen.trabajador_contrato_a_prueba OWNER TO postgres;

--
-- TOC entry 1875 (class 1259 OID 171062)
-- Dependencies: 2042 13
-- Name: trabajador_contrato_a_temporal; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_contrato_a_temporal AS
    SELECT ubicacion_defensa_tipo.nombre AS ubicacion, lugar_procedencia.nombre AS procedencia, ubicacion_defensa.ubicacion_defensa_tipoid AS idubicacion, contrato_tipo.nombre AS tipo_contrato, area.nombre AS area, agencia.nombre AS agencia, agencia.empresaid AS empresa, listado_cargos.areaid, area.agenciaid, cargo.nombre AS cargo, contrato.contrato_tipoid, contrato.trabajadorid, plantilla.listado_cargosid, trabajador.lugar_procedenciaid, trabajador.nombre, trabajador.apellido_1 AS apellido, trabajador.apellido_2 AS apellido_s, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, trabajador.no_identidad AS identidad, trabajador.fecha_nacimiento AS fnacimiento, contrato.fecha_inicio, contrato.fecha_final, trabajador.direccion AS dir FROM ((((((((((plantilla.trabajador JOIN pago.contrato ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) JOIN plantilla.plantilla ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.ubicacion_defensa ON (((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text))) LEFT JOIN nomencladores.ubicacion_defensa_tipo ON (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text))) JOIN nomencladores.lugar_procedencia ON (((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) JOIN nomencladores.agencia ON (((area.agenciaid)::text = (agencia.id)::text))) JOIN nomencladores.contrato_tipo ON ((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((contrato_tipo.id)::text = 'DE_capital_humano_765'::text))));


ALTER TABLE vistas_resumen.trabajador_contrato_a_temporal OWNER TO postgres;

--
-- TOC entry 1876 (class 1259 OID 171067)
-- Dependencies: 2043 13
-- Name: trabajador_contrato_adiestramiento; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_contrato_adiestramiento AS
    SELECT ubicacion_defensa_tipo.nombre AS ubicacion, lugar_procedencia.nombre AS procedencia, ubicacion_defensa.ubicacion_defensa_tipoid AS idubicacion, contrato_tipo.nombre AS tipo_contrato, area.nombre AS area, agencia.nombre AS agencia, agencia.empresaid AS empresa, listado_cargos.areaid, area.agenciaid, cargo.nombre AS cargo, contrato.contrato_tipoid, contrato.trabajadorid, plantilla.listado_cargosid, trabajador.lugar_procedenciaid, trabajador.nombre, trabajador.apellido_1 AS apellido, trabajador.apellido_2 AS apellido_s, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, trabajador.no_identidad AS identidad, trabajador.fecha_nacimiento AS fnacimiento, contrato.fecha_inicio, contrato.fecha_final, trabajador.direccion AS dir FROM ((((((((((plantilla.trabajador JOIN pago.contrato ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) JOIN plantilla.plantilla ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.ubicacion_defensa ON (((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text))) LEFT JOIN nomencladores.ubicacion_defensa_tipo ON (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text))) JOIN nomencladores.lugar_procedencia ON (((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) JOIN nomencladores.agencia ON (((area.agenciaid)::text = (agencia.id)::text))) JOIN nomencladores.contrato_tipo ON ((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1129'::text))));


ALTER TABLE vistas_resumen.trabajador_contrato_adiestramiento OWNER TO postgres;

--
-- TOC entry 1877 (class 1259 OID 171072)
-- Dependencies: 2044 13
-- Name: trabajador_contrato_disponible; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_contrato_disponible AS
    SELECT ubicacion_defensa_tipo.nombre AS ubicacion, lugar_procedencia.nombre AS procedencia, ubicacion_defensa.ubicacion_defensa_tipoid AS idubicacion, contrato_tipo.nombre AS tipo_contrato, area.nombre AS area, agencia.nombre AS agencia, agencia.empresaid AS empresa, listado_cargos.areaid, area.agenciaid, cargo.nombre AS cargo, contrato.contrato_tipoid, contrato.trabajadorid, plantilla.listado_cargosid, trabajador.lugar_procedenciaid, trabajador.nombre, trabajador.apellido_1 AS apellido, trabajador.apellido_2 AS apellido_s, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, trabajador.no_identidad AS identidad, trabajador.fecha_nacimiento AS fnacimiento, contrato.fecha_inicio, contrato.fecha_final, trabajador.direccion AS dir FROM ((((((((((plantilla.trabajador JOIN pago.contrato ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) JOIN plantilla.plantilla ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.ubicacion_defensa ON (((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text))) LEFT JOIN nomencladores.ubicacion_defensa_tipo ON (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text))) JOIN nomencladores.lugar_procedencia ON (((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) JOIN nomencladores.agencia ON (((area.agenciaid)::text = (agencia.id)::text))) JOIN nomencladores.contrato_tipo ON ((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1130'::text))));


ALTER TABLE vistas_resumen.trabajador_contrato_disponible OWNER TO postgres;

--
-- TOC entry 1878 (class 1259 OID 171094)
-- Dependencies: 2045 13
-- Name: trabajador_contrato_domiciliar; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_contrato_domiciliar AS
    SELECT ubicacion_defensa_tipo.nombre AS ubicacion, trabajador.direccion AS dir, lugar_procedencia.nombre AS procedencia, ubicacion_defensa.ubicacion_defensa_tipoid AS idubicacion, contrato_tipo.nombre AS tipo_contrato, area.nombre AS area, agencia.nombre AS agencia, agencia.empresaid AS empresa, listado_cargos.areaid, area.agenciaid, cargo.nombre AS cargo, contrato.contrato_tipoid, contrato.fecha_inicio, contrato.fecha_final, contrato.trabajadorid, plantilla.listado_cargosid, trabajador.lugar_procedenciaid, trabajador.nombre, trabajador.apellido_1 AS apellido, trabajador.apellido_2 AS apellido_s, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, trabajador.no_identidad AS identidad, trabajador.fecha_nacimiento AS fnacimiento FROM ((((((((((plantilla.trabajador JOIN pago.contrato ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) JOIN plantilla.plantilla ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.ubicacion_defensa ON (((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text))) LEFT JOIN nomencladores.ubicacion_defensa_tipo ON (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text))) JOIN nomencladores.lugar_procedencia ON (((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) JOIN nomencladores.agencia ON (((area.agenciaid)::text = (agencia.id)::text))) JOIN nomencladores.contrato_tipo ON ((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((contrato_tipo.id)::text = 'DE_capital_humano_1131'::text))));


ALTER TABLE vistas_resumen.trabajador_contrato_domiciliar OWNER TO postgres;

--
-- TOC entry 1873 (class 1259 OID 171052)
-- Dependencies: 2040 13
-- Name: trabajador_contrato_indefinido; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_contrato_indefinido AS
    SELECT ubicacion_defensa_tipo.nombre AS ubicacion, lugar_procedencia.nombre AS procedencia, ubicacion_defensa.ubicacion_defensa_tipoid AS idubicacion, contrato_tipo.nombre AS tipo_contrato, area.nombre AS area, agencia.nombre AS agencia, agencia.empresaid AS empresa, listado_cargos.areaid, area.agenciaid, cargo.nombre AS cargo, contrato.contrato_tipoid, contrato.trabajadorid, plantilla.listado_cargosid, trabajador.lugar_procedenciaid, trabajador.nombre, trabajador.apellido_1 AS apellido, trabajador.apellido_2 AS apellido_s, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, trabajador.no_identidad AS identidad, trabajador.fecha_nacimiento AS fnacimiento, contrato.fecha_inicio, contrato.fecha_final, trabajador.direccion AS dir FROM ((((((((((plantilla.trabajador JOIN pago.contrato ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) JOIN plantilla.plantilla ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.ubicacion_defensa ON (((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text))) LEFT JOIN nomencladores.ubicacion_defensa_tipo ON (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text))) JOIN nomencladores.lugar_procedencia ON (((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) JOIN nomencladores.agencia ON (((area.agenciaid)::text = (agencia.id)::text))) JOIN nomencladores.contrato_tipo ON ((((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text) AND ((contrato_tipo.id)::text = 'DE_capital_humano_766'::text))));


ALTER TABLE vistas_resumen.trabajador_contrato_indefinido OWNER TO postgres;

--
-- TOC entry 1879 (class 1259 OID 171101)
-- Dependencies: 2046 13
-- Name: trabajador_contrato_vencidos; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_contrato_vencidos AS
    SELECT ubicacion_defensa_tipo.nombre AS ubicacion, lugar_procedencia.nombre AS procedencia, ubicacion_defensa.ubicacion_defensa_tipoid AS idubicacion, contrato_tipo.nombre AS tipo_contrato, area.nombre AS area, agencia.nombre AS agencia, agencia.empresaid AS empresa, listado_cargos.areaid, area.agenciaid, cargo.nombre AS cargo, contrato.contrato_tipoid, contrato.trabajadorid, plantilla.listado_cargosid, trabajador.lugar_procedenciaid, trabajador.nombre, trabajador.apellido_1 AS apellido, trabajador.apellido_2 AS apellido_s, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, trabajador.no_identidad AS identidad, trabajador.fecha_nacimiento AS fnacimiento, trabajador.direccion AS dir, contrato.fecha_inicio, contrato.fecha_final FROM ((((((((((plantilla.trabajador JOIN pago.contrato ON (((trabajador.id)::text = (contrato.trabajadorid)::text))) JOIN plantilla.plantilla ON (((contrato.id)::text = (plantilla.contratoid)::text))) LEFT JOIN plantilla.ubicacion_defensa ON (((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text))) LEFT JOIN nomencladores.ubicacion_defensa_tipo ON (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text))) JOIN nomencladores.lugar_procedencia ON (((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text))) JOIN plantilla.listado_cargos ON (((plantilla.listado_cargosid)::text = (listado_cargos.id)::text))) JOIN plantilla.cargo ON (((listado_cargos.cargoid)::text = (cargo.id)::text))) JOIN nomencladores.area ON (((listado_cargos.areaid)::text = (area.id)::text))) JOIN nomencladores.agencia ON (((area.agenciaid)::text = (agencia.id)::text))) JOIN nomencladores.contrato_tipo ON (((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text))) WHERE (contrato.fecha_final <= ('now'::text)::date);


ALTER TABLE vistas_resumen.trabajador_contrato_vencidos OWNER TO postgres;

--
-- TOC entry 1898 (class 1259 OID 179422)
-- Dependencies: 2064 13
-- Name: trabajador_de_ujc; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_de_ujc AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.integracionid)::text = 'DE_capital_humano_760'::text));


ALTER TABLE vistas_resumen.trabajador_de_ujc OWNER TO postgres;

--
-- TOC entry 1897 (class 1259 OID 179417)
-- Dependencies: 2063 13
-- Name: trabajador_del_pcc; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_del_pcc AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.integracionid)::text = 'DE_capital_humano_759'::text));


ALTER TABLE vistas_resumen.trabajador_del_pcc OWNER TO postgres;

--
-- TOC entry 1861 (class 1259 OID 170993)
-- Dependencies: 2028 13
-- Name: trabajador_enplantilla_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_enplantilla_vista AS
    SELECT trabajador.nombre, trabajador.id AS trabajadorid, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo, contrato.id AS contratoid FROM (pago.contrato JOIN plantilla.trabajador ON (((contrato.trabajadorid)::text = (trabajador.id)::text))) WHERE ((contrato.activo)::text = 'true'::text);


ALTER TABLE vistas_resumen.trabajador_enplantilla_vista OWNER TO postgres;

--
-- TOC entry 1882 (class 1259 OID 171122)
-- Dependencies: 2049 13
-- Name: trabajador_inactivo; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_inactivo AS
    SELECT mbajas.nombre AS m_baja, dbajas.nombre AS d_baja, trabajador.nombre_completo AS nombre, trabajador.id, trabajador.no_identidad AS identidad, trabajador.telefono FROM ((plantilla.trabajador JOIN nomencladores.mbajas ON (((trabajador.mbaja)::text = (mbajas.id)::text))) JOIN nomencladores.dbajas ON ((((trabajador.dbaja)::text = (dbajas.id)::text) AND (trabajador.activo = false))));


ALTER TABLE vistas_resumen.trabajador_inactivo OWNER TO postgres;

--
-- TOC entry 1905 (class 1259 OID 179457)
-- Dependencies: 2071 13
-- Name: trabajador_nivel_12mo; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_nivel_12mo AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.nivel_culturalid)::text = 'DE_capital_humano_1182'::text));


ALTER TABLE vistas_resumen.trabajador_nivel_12mo OWNER TO postgres;

--
-- TOC entry 1904 (class 1259 OID 179452)
-- Dependencies: 2070 13
-- Name: trabajador_nivel_6to; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_nivel_6to AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.nivel_culturalid)::text = 'DE_capital_humano_1184'::text));


ALTER TABLE vistas_resumen.trabajador_nivel_6to OWNER TO postgres;

--
-- TOC entry 1903 (class 1259 OID 179447)
-- Dependencies: 2069 13
-- Name: trabajador_nivel_9no; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_nivel_9no AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.nivel_culturalid)::text = 'DE_capital_humano_1183'::text));


ALTER TABLE vistas_resumen.trabajador_nivel_9no OWNER TO postgres;

--
-- TOC entry 1902 (class 1259 OID 179442)
-- Dependencies: 2068 13
-- Name: trabajador_nivel_ninguno; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_nivel_ninguno AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.nivel_culturalid)::text = 'DE_capital_humano_1185'::text));


ALTER TABLE vistas_resumen.trabajador_nivel_ninguno OWNER TO postgres;

--
-- TOC entry 1901 (class 1259 OID 179437)
-- Dependencies: 2067 13
-- Name: trabajador_nivel_obrero; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_nivel_obrero AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.nivel_culturalid)::text = 'DE_capital_humano_1220'::text));


ALTER TABLE vistas_resumen.trabajador_nivel_obrero OWNER TO postgres;

--
-- TOC entry 1899 (class 1259 OID 179427)
-- Dependencies: 2065 13
-- Name: trabajador_nivel_superior; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_nivel_superior AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.nivel_culturalid)::text = 'DE_capital_humano_772'::text));


ALTER TABLE vistas_resumen.trabajador_nivel_superior OWNER TO postgres;

--
-- TOC entry 1900 (class 1259 OID 179432)
-- Dependencies: 2066 13
-- Name: trabajador_nivel_tecnico; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_nivel_tecnico AS
    SELECT trabajador.nombre_completo AS nombre, nivel_cultural.nombre AS nivel, integracion.nombre AS intregracion, cargo.nombre AS cargo, contrato.fecha_inicio AS inicio, contrato_tipo.nombre AS contrato_tipo FROM plantilla.trabajador, nomencladores.nivel_cultural, nomencladores.integracion, plantilla.cargo, plantilla.listado_cargos, plantilla.plantilla, pago.contrato, nomencladores.contrato_tipo WHERE (((((((((trabajador.integracionid)::text = (integracion.id)::text) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((listado_cargos.cargoid)::text = (cargo.id)::text)) AND ((plantilla.listado_cargosid)::text = (listado_cargos.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((trabajador.nivel_culturalid)::text = 'DE_capital_humano_773'::text));


ALTER TABLE vistas_resumen.trabajador_nivel_tecnico OWNER TO postgres;

--
-- TOC entry 1862 (class 1259 OID 170998)
-- Dependencies: 2029 13
-- Name: trabajador_proyecto_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_proyecto_vista AS
    SELECT trabajador_proyecto.id, trabajador.nombre, proyecto.nombre AS proyecto, trabajador_proyecto.fecha, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo FROM ((pago.trabajador_proyecto JOIN plantilla.trabajador ON (((trabajador_proyecto.trabajadorid)::text = (trabajador.id)::text))) JOIN pago.proyecto ON (((trabajador_proyecto.proyectoid)::text = (proyecto.id)::text)));


ALTER TABLE vistas_resumen.trabajador_proyecto_vista OWNER TO postgres;

--
-- TOC entry 1870 (class 1259 OID 171036)
-- Dependencies: 2037 13
-- Name: trabajador_vista; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajador_vista AS
    SELECT camisa.valor AS camisa_blusa, pantalon.valor AS pantalo_salla, zapato.valor AS zapato, trabajador.id, trabajador.codigo_nomina, trabajador.no_identidad, trabajador.nombre, trabajador.codigo, trabajador.mbaja, trabajador.dbaja, trabajador.apellido_1, trabajador.apellido_2, trabajador.fecha_nacimiento, trabajador.nombre_padre, trabajador.estatura, trabajador.peso, trabajador.telefono, trabajador.direccion, trabajador.sancionado, trabajador.activo, trabajador.nombre_madre, estado_civil.nombre AS estado_civil, sexo.nombre AS sexo, color_piel.nombre AS color_de_piel, reparto.nombre AS reparto, lugar_procedencia.nombre AS lugar_de_procedencia, nivel_cultural.nombre AS ncultural, integracion.nombre AS integracion, ubicacion_excepcional.nombre AS ubicacion_excepcional, registro_militar.nombre AS registro_militar FROM (((plantilla.trabajador JOIN nomencladores.talla camisa ON (((trabajador.talla_camisa_blusa)::text = (camisa.id)::text))) JOIN nomencladores.talla pantalon ON (((trabajador.talla_pantalon_saya)::text = (pantalon.id)::text))) JOIN nomencladores.talla zapato ON (((trabajador.talla_zapato)::text = (zapato.id)::text))), nomencladores.estado_civil, nomencladores.sexo, nomencladores.color_piel, nomencladores.reparto, nomencladores.lugar_procedencia, nomencladores.nivel_cultural, nomencladores.integracion, nomencladores.ubicacion_excepcional, nomencladores.registro_militar WHERE (((((((((((trabajador.estado_civilid)::text = (estado_civil.id)::text) AND ((trabajador.sexoid)::text = (sexo.id)::text)) AND ((trabajador.color_pielid)::text = (color_piel.id)::text)) AND ((trabajador.repartoid)::text = (reparto.id)::text)) AND ((trabajador.lugar_procedenciaid)::text = (lugar_procedencia.id)::text)) AND ((trabajador.nivel_culturalid)::text = (nivel_cultural.id)::text)) AND ((trabajador.integracionid)::text = (integracion.id)::text)) AND ((trabajador.ubicacion_excepcionalid)::text = (ubicacion_excepcional.id)::text)) AND ((trabajador.registro_militarid)::text = (registro_militar.id)::text)) AND (trabajador.activo = true));


ALTER TABLE vistas_resumen.trabajador_vista OWNER TO postgres;

--
-- TOC entry 1912 (class 1259 OID 179492)
-- Dependencies: 2078 13
-- Name: trabajdores_antiguedad; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajdores_antiguedad AS
    SELECT sexo.nombre AS sexo, contrato.fecha_inicio AS contrato_fi, contrato.fecha_final AS contrato_ff, (trabajador.tiempo / 12) AS antig, trabajador.fecha_inicio, trabajador.nombre_completo AS nombre, categoria_ocupacional.nombre AS categoria, trabajador.fecha_nacimiento AS cumple, date_part('days'::text, ((now() - (trabajador.fecha_nacimiento)::timestamp with time zone) / (365)::double precision)) AS annos, contrato_tipo.id AS contrato_id, contrato_tipo.nombre AS contrato FROM plantilla.trabajador, plantilla.listado_cargos, plantilla.cargo, pago.contrato, plantilla.plantilla, nomencladores.sexo, nomencladores.categoria_ocupacional, nomencladores.contrato_tipo WHERE (((((((((trabajador.id)::text = (contrato.trabajadorid)::text) AND ((trabajador.sexoid)::text = (sexo.id)::text)) AND ((listado_cargos.id)::text = (plantilla.listado_cargosid)::text)) AND ((cargo.id)::text = (listado_cargos.cargoid)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) AND ((contrato_tipo.id)::text = 'DE_capital_humano_766'::text)) ORDER BY date_part('days'::text, ((now() - (trabajador.fecha_nacimiento)::timestamp with time zone) / (365)::double precision)) DESC;


ALTER TABLE vistas_resumen.trabajdores_antiguedad OWNER TO postgres;

--
-- TOC entry 1913 (class 1259 OID 179497)
-- Dependencies: 2079 13
-- Name: trabajdores_antiguedad_update; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW trabajdores_antiguedad_update AS
    SELECT sexo.nombre AS sexo, contrato.fecha_inicio AS contrato_fi, contrato.fecha_final AS contrato_ff, trabajador.tiempo AS antig_neses, (trabajador.tiempo / 12) AS antig_anios, trabajador.fecha_inicio, trabajador.nombre_completo AS nombre, categoria_ocupacional.nombre AS categoria, trabajador.fecha_nacimiento AS cumple, date_part('days'::text, ((now() - (trabajador.fecha_nacimiento)::timestamp with time zone) / (365)::double precision)) AS annos, contrato_tipo.id AS contrato_id, contrato_tipo.nombre AS contrato FROM plantilla.trabajador, plantilla.listado_cargos, plantilla.cargo, pago.contrato, plantilla.plantilla, nomencladores.sexo, nomencladores.categoria_ocupacional, nomencladores.contrato_tipo WHERE (((((((((contrato_tipo.id)::text = 'DE_capital_humano_766'::text) AND ((trabajador.id)::text = (contrato.trabajadorid)::text)) AND ((trabajador.sexoid)::text = (sexo.id)::text)) AND ((listado_cargos.id)::text = (plantilla.listado_cargosid)::text)) AND ((cargo.id)::text = (listado_cargos.cargoid)::text)) AND ((cargo.categoria_ocupacionalid)::text = (categoria_ocupacional.id)::text)) AND ((contrato.id)::text = (plantilla.contratoid)::text)) AND ((contrato.contrato_tipoid)::text = (contrato_tipo.id)::text)) ORDER BY date_part('days'::text, ((now() - (trabajador.fecha_nacimiento)::timestamp with time zone) / (365)::double precision)) DESC;


ALTER TABLE vistas_resumen.trabajdores_antiguedad_update OWNER TO postgres;

--
-- TOC entry 1915 (class 1259 OID 179521)
-- Dependencies: 2081 13
-- Name: ubicacion_defensa_cantidad; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW ubicacion_defensa_cantidad AS
    SELECT count(trabajador.id) AS count, ubicacion_defensa_tipo.nombre FROM nomencladores.ubicacion_defensa_tipo, plantilla.ubicacion_defensa, plantilla.trabajador WHERE (((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text) AND ((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text)) GROUP BY ubicacion_defensa_tipo.nombre ORDER BY ubicacion_defensa_tipo.nombre;


ALTER TABLE vistas_resumen.ubicacion_defensa_cantidad OWNER TO postgres;

--
-- TOC entry 1916 (class 1259 OID 179525)
-- Dependencies: 2082 13
-- Name: ubicacion_defensa_trabajadores; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW ubicacion_defensa_trabajadores AS
    SELECT ubicacion_defensa_tipo.nombre AS udefensa, trabajador.nombre_completo AS nombre, trabajador.telefono, trabajador.no_identidad, municipio.nombre AS munic, provincia.nombre AS prov, reparto.nombre AS repart, trabajador.direccion AS dir FROM nomencladores.ubicacion_defensa_tipo, plantilla.ubicacion_defensa, plantilla.trabajador, nomencladores.municipio, nomencladores.reparto, nomencladores.provincia WHERE ((((((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text) AND ((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text)) AND ((trabajador.repartoid)::text = (reparto.id)::text)) AND ((municipio.id)::text = (reparto.municipioid)::text)) AND ((provincia.id)::text = (municipio.provinciaid)::text)) ORDER BY trabajador.nombre_completo;


ALTER TABLE vistas_resumen.ubicacion_defensa_trabajadores OWNER TO postgres;

--
-- TOC entry 1917 (class 1259 OID 179530)
-- Dependencies: 2083 13
-- Name: ubicacion_defensa_trabajadores_noinc; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW ubicacion_defensa_trabajadores_noinc AS
    SELECT ubicacion_defensa_tipo.nombre AS udefensa, trabajador.nombre_completo AS nombre, trabajador.telefono, trabajador.no_identidad, municipio.nombre AS munic, provincia.nombre AS prov, reparto.nombre AS repart, trabajador.direccion AS dir FROM nomencladores.ubicacion_defensa_tipo, plantilla.ubicacion_defensa, plantilla.trabajador, nomencladores.municipio, nomencladores.reparto, nomencladores.provincia WHERE (((((((ubicacion_defensa.ubicacion_defensa_tipoid)::text = (ubicacion_defensa_tipo.id)::text) AND ((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text)) AND ((trabajador.repartoid)::text = (reparto.id)::text)) AND ((municipio.id)::text = (reparto.municipioid)::text)) AND ((provincia.id)::text = (municipio.provinciaid)::text)) AND ((ubicacion_defensa_tipo.id)::text = 'DE_capital_humano_1222'::text)) ORDER BY trabajador.nombre_completo;


ALTER TABLE vistas_resumen.ubicacion_defensa_trabajadores_noinc OWNER TO postgres;

--
-- TOC entry 1871 (class 1259 OID 171041)
-- Dependencies: 2038 13
-- Name: ubicaciondfensa; Type: VIEW; Schema: vistas_resumen; Owner: postgres
--

CREATE VIEW ubicaciondfensa AS
    SELECT trabajador.nombre AS trabajador, ubicacion_defensa_tipo.nombre AS ubicacion, ubicacion_defensa.id, (((((trabajador.nombre)::text || ' '::text) || (trabajador.apellido_1)::text) || ' '::text) || (trabajador.apellido_2)::text) AS nombre_completo FROM plantilla.trabajador, plantilla.ubicacion_defensa, nomencladores.ubicacion_defensa_tipo WHERE (((((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text) AND ((ubicacion_defensa_tipo.id)::text = (ubicacion_defensa.ubicacion_defensa_tipoid)::text)) AND ((trabajador.id)::text = (ubicacion_defensa.trabajadorid)::text)) AND ((ubicacion_defensa_tipo.id)::text = (ubicacion_defensa.ubicacion_defensa_tipoid)::text));


ALTER TABLE vistas_resumen.ubicaciondfensa OWNER TO postgres;

SET search_path = clone, pg_catalog;

--
-- TOC entry 2528 (class 0 OID 169506)
-- Dependencies: 1787
-- Data for Name: config; Type: TABLE DATA; Schema: clone; Owner: postgres
--

INSERT INTO config (id, nombre, direccion, puerto, usuario, contrasenna, nodo) VALUES ('1', 'capital_humano', 'localhost', 5432, 'postgres', 'postgres', 'DE');


SET search_path = nomencladores, pg_catalog;

--
-- TOC entry 2529 (class 0 OID 169515)
-- Dependencies: 1789
-- Data for Name: agencia; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO agencia (id, empresaid, codigo, nombre, activo) VALUES ('DE_capital_humano_835', 'DE_capital_humano_721', 2, 'Economía', true);
INSERT INTO agencia (id, empresaid, codigo, nombre, activo) VALUES ('DE_capital_humano_722', 'DE_capital_humano_721', 1, 'Agencia Investigación y Desarrollo', true);


--
-- TOC entry 2532 (class 0 OID 169537)
-- Dependencies: 1792
-- Data for Name: anno; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO anno (id, valor, activo) VALUES ('DE_capital_humano_858', 2013, 'true                                                                                                                                                                                                                                                           ');
INSERT INTO anno (id, valor, activo) VALUES ('DE_capital_humano_1100', 2015, 'true                                                                                                                                                                                                                                                           ');


--
-- TOC entry 2533 (class 0 OID 169542)
-- Dependencies: 1793
-- Data for Name: anno_mes; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO anno_mes (id, annoid, mesid, activo) VALUES ('DE_capital_humano_864', 'DE_capital_humano_858', 'DE_capital_humano_859', true);
INSERT INTO anno_mes (id, annoid, mesid, activo) VALUES ('DE_capital_humano_1102', 'DE_capital_humano_1100', 'DE_capital_humano_1101', true);
INSERT INTO anno_mes (id, annoid, mesid, activo) VALUES ('DE_capital_humano_1107', 'DE_capital_humano_858', 'DE_capital_humano_1101', true);
INSERT INTO anno_mes (id, annoid, mesid, activo) VALUES ('DE_capital_humano_1108', 'DE_capital_humano_1100', 'DE_capital_humano_859', true);


--
-- TOC entry 2530 (class 0 OID 169520)
-- Dependencies: 1790
-- Data for Name: area; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO area (id, agenciaid, activo, nombre) VALUES ('DE_capital_humano_725', 'DE_capital_humano_722', NULL, 'Seguridad Informática');
INSERT INTO area (id, agenciaid, activo, nombre) VALUES ('DE_capital_humano_1150', 'DE_capital_humano_835', NULL, 'Economia Laboral');
INSERT INTO area (id, agenciaid, activo, nombre) VALUES ('DE_capital_humano_723', 'DE_capital_humano_835', NULL, 'Grupo de Contadores');
INSERT INTO area (id, agenciaid, activo, nombre) VALUES ('DE_capital_humano_842', 'DE_capital_humano_722', NULL, 'Taller Software');
INSERT INTO area (id, agenciaid, activo, nombre) VALUES ('DE_capital_humano_841', 'DE_capital_humano_722', NULL, 'Direcion');


--
-- TOC entry 2535 (class 0 OID 169560)
-- Dependencies: 1795
-- Data for Name: cargo_militar; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO cargo_militar (id, nombre, activo) VALUES ('DE_capital_humano_726', 'Jefe de Contingencia', NULL);
INSERT INTO cargo_militar (id, nombre, activo) VALUES ('DE_capital_humano_727', 'Jefe de Albergue', NULL);
INSERT INTO cargo_militar (id, nombre, activo) VALUES ('DE_capital_humano_1048', 'Jefe de Cocina', NULL);
INSERT INTO cargo_militar (id, nombre, activo) VALUES ('DE_capital_humano_1050', 'Jefe Guardia', NULL);
INSERT INTO cargo_militar (id, nombre, activo) VALUES ('DE_capital_humano_728', 'Operario de Tanque', NULL);


--
-- TOC entry 2536 (class 0 OID 169564)
-- Dependencies: 1796
-- Data for Name: categoria_ocupacional; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO categoria_ocupacional (id, activo, nombre) VALUES ('DE_capital_humano_768', true, 'Operario');
INSERT INTO categoria_ocupacional (id, activo, nombre) VALUES ('DE_capital_humano_770', true, 'Tecnico');
INSERT INTO categoria_ocupacional (id, activo, nombre) VALUES ('DE_capital_humano_818', true, 'Administrativo');
INSERT INTO categoria_ocupacional (id, activo, nombre) VALUES ('DE_capital_humano_872', true, 'Servicio');
INSERT INTO categoria_ocupacional (id, activo, nombre) VALUES ('DE_capital_humano_931', true, 'Sin Categoria');
INSERT INTO categoria_ocupacional (id, activo, nombre) VALUES ('DE_capital_humano_771', true, 'Directivo');


--
-- TOC entry 2537 (class 0 OID 169571)
-- Dependencies: 1797
-- Data for Name: clasificacion_d_i; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO clasificacion_d_i (id, activo, noambre) VALUES ('DE_capital_humano_782', NULL, 'Directos');
INSERT INTO clasificacion_d_i (id, activo, noambre) VALUES ('DE_capital_humano_783', NULL, 'Indirectos');


--
-- TOC entry 2538 (class 0 OID 169578)
-- Dependencies: 1798
-- Data for Name: color_piel; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO color_piel (id, nombre, activo) VALUES ('DE_capital_humano_774', 'Negra', true);
INSERT INTO color_piel (id, nombre, activo) VALUES ('DE_capital_humano_775', 'Blanca', true);
INSERT INTO color_piel (id, nombre, activo) VALUES ('DE_capital_humano_776', 'Mestiza', true);


--
-- TOC entry 2539 (class 0 OID 169587)
-- Dependencies: 1799
-- Data for Name: condecoracion_tipo; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO condecoracion_tipo (id, nombre, activo) VALUES ('DE_capital_humano_1032', 'Mariana Grajales', NULL);
INSERT INTO condecoracion_tipo (id, nombre, activo) VALUES ('DE_capital_humano_961', 'Jovenes Forjadores del Futuro', NULL);


--
-- TOC entry 2540 (class 0 OID 169591)
-- Dependencies: 1800
-- Data for Name: contrato_tipo; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO contrato_tipo (id, activo, nombre) VALUES ('DE_capital_humano_765', true, 'Temporal                                                                                                                                                                                                                                                       ');
INSERT INTO contrato_tipo (id, activo, nombre) VALUES ('DE_capital_humano_767', true, 'A prueba                                                                                                                                                                                                                                                       ');
INSERT INTO contrato_tipo (id, activo, nombre) VALUES ('DE_capital_humano_1129', true, 'Adiestraminento                                                                                                                                                                                                                                                ');
INSERT INTO contrato_tipo (id, activo, nombre) VALUES ('DE_capital_humano_1130', true, 'Disponible                                                                                                                                                                                                                                                     ');
INSERT INTO contrato_tipo (id, activo, nombre) VALUES ('DE_capital_humano_1131', true, 'Domiciliar                                                                                                                                                                                                                                                     ');
INSERT INTO contrato_tipo (id, activo, nombre) VALUES ('DE_capital_humano_766', true, 'Indeterminado                                                                                                                                                                                                                                                  ');


--
-- TOC entry 2541 (class 0 OID 169596)
-- Dependencies: 1801
-- Data for Name: dbajas; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_736', 'Otro centro de trabajo', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_974', 'Jubilado', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1204', 'Reserva Laboral', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1205', 'Fallecimiento', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1206', 'Solicitud Propia', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1207', 'Mejora Salarial', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1208', 'Lejania', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1209', 'Separacion definitiva del centro', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1210', 'Peritaje medico', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1211', 'Para su casa', true);
INSERT INTO dbajas (id, nombre, activo) VALUES ('DE_capital_humano_1212', 'SMA', true);


--
-- TOC entry 2531 (class 0 OID 169528)
-- Dependencies: 1791
-- Data for Name: empresa; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO empresa (id, activo, nombre) VALUES ('DE_capital_humano_721', true, 'GeoCuba                                                                                                                                                                                                                                                        ');


--
-- TOC entry 2542 (class 0 OID 169604)
-- Dependencies: 1802
-- Data for Name: estado_civil; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO estado_civil (id, nombre, activo) VALUES ('DE_capital_humano_762', 'Soltero', true);
INSERT INTO estado_civil (id, nombre, activo) VALUES ('DE_capital_humano_763', 'Viudo', true);
INSERT INTO estado_civil (id, nombre, activo) VALUES ('DE_capital_humano_764', 'Divorciado', true);
INSERT INTO estado_civil (id, nombre, activo) VALUES ('DE_capital_humano_807', 'Casada', true);


--
-- TOC entry 2576 (class 0 OID 170721)
-- Dependencies: 1836
-- Data for Name: forma_pago; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO forma_pago (id, nombre, activo) VALUES ('DE_capital_humano_939', 'Por Resultados', true);
INSERT INTO forma_pago (id, nombre, activo) VALUES ('DE_capital_humano_938', 'A Tiempo', true);
INSERT INTO forma_pago (id, nombre, activo) VALUES ('DE_capital_humano_1103', 'Estimulación', true);


--
-- TOC entry 2543 (class 0 OID 169613)
-- Dependencies: 1803
-- Data for Name: grado_militar; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO grado_militar (id, nombre, activo) VALUES ('DE_capital_humano_729', 'General de C.Ejercito', true);
INSERT INTO grado_militar (id, nombre, activo) VALUES ('DE_capital_humano_731', 'T.Coronel', true);
INSERT INTO grado_militar (id, nombre, activo) VALUES ('DE_capital_humano_730', 'Capitán', true);


--
-- TOC entry 2544 (class 0 OID 169618)
-- Dependencies: 1804
-- Data for Name: grupo_escala; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO grupo_escala (id, activo, nombre, salario, pago_adicion) VALUES ('DE_capital_humano_732', true, 'X', 250, 50);
INSERT INTO grupo_escala (id, activo, nombre, salario, pago_adicion) VALUES ('DE_capital_humano_733', true, 'XI', 274, 85);
INSERT INTO grupo_escala (id, activo, nombre, salario, pago_adicion) VALUES ('DE_capital_humano_734', true, 'XV', 305, 95);
INSERT INTO grupo_escala (id, activo, nombre, salario, pago_adicion) VALUES ('DE_capital_humano_932', true, 'XII', 365, 90);


--
-- TOC entry 2578 (class 0 OID 170736)
-- Dependencies: 1838
-- Data for Name: horario_trabajo; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO horario_trabajo (id, tipo, activo) VALUES ('DE_capital_humano_949', 'De 06:30 am a 19:30 hrs (2 dias trab.  x 2 de descanso)', true);
INSERT INTO horario_trabajo (id, tipo, activo) VALUES ('DE_capital_humano_950', 'De 7:30 am a 11:45  y 12:30 a 17:00 pm', true);
INSERT INTO horario_trabajo (id, tipo, activo) VALUES ('DE_capital_humano_951', 'De 7:15 am a 12:00  y 12:30 a 14:00 pm', true);


--
-- TOC entry 2545 (class 0 OID 169623)
-- Dependencies: 1805
-- Data for Name: integracion; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO integracion (id, nombre, activo) VALUES ('DE_capital_humano_759', 'PCC', true);
INSERT INTO integracion (id, nombre, activo) VALUES ('DE_capital_humano_760', 'UJC', true);
INSERT INTO integracion (id, nombre, activo) VALUES ('DE_capital_humano_1221', 'Sin Categoria ', true);


--
-- TOC entry 2546 (class 0 OID 169628)
-- Dependencies: 1806
-- Data for Name: lugar_procedencia; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO lugar_procedencia (id, nombre, activo) VALUES ('DE_capital_humano_751', 'ONEI', true);
INSERT INTO lugar_procedencia (id, nombre, activo) VALUES ('DE_capital_humano_752', 'Etecsa', true);
INSERT INTO lugar_procedencia (id, nombre, activo) VALUES ('DE_capital_humano_812', 'UPR', true);


--
-- TOC entry 2547 (class 0 OID 169637)
-- Dependencies: 1807
-- Data for Name: mbajas; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_735', 'Periodo a prueba no satisfactorio', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1186', 'Por enfermedad', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1187', 'Mejora salarial', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1188', 'Mejor equipamiento', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1189', 'Mejores condiciones de estimulacion matrial', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1190', 'Geocuba no cumplio con las espectativas', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1191', 'Se desvincula totelmente. Casa o Cuentapropista', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1192', 'Mala atencion o deficientetratamientoen Geocuba', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1193', 'Otras causas. Lejania,transportacion,etc ', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1194', 'Translado a otra empresa dentro de Geocuba', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1195', 'Translado a otra epresa dentro de las FAR', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1196', 'Aplicacion de medida diciplinaria', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1197', 'Cuminacion de contrato', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1198', 'Fallecimiento', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1199', 'Otros motivos', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1200', 'Jubilacion', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1201', 'Liberacion de cargo', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1202', 'Problemas Familiares', true);
INSERT INTO mbajas (id, nombre, activo) VALUES ('DE_capital_humano_1203', 'Servicio Militar', true);


--
-- TOC entry 2534 (class 0 OID 169547)
-- Dependencies: 1794
-- Data for Name: mes; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO mes (id, nombre, numero, activo) VALUES ('DE_capital_humano_859', 'Enero', 1, true);
INSERT INTO mes (id, nombre, numero, activo) VALUES ('DE_capital_humano_1101', 'Diciembre', 12, true);


--
-- TOC entry 2548 (class 0 OID 169653)
-- Dependencies: 1808
-- Data for Name: municipio; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO municipio (id, nombre, provinciaid, activo) VALUES ('DE_capital_humano_748', 'San Luis', 'DE_capital_humano_746', true);
INSERT INTO municipio (id, nombre, provinciaid, activo) VALUES ('DE_capital_humano_814', 'San Juan y Martínez', 'DE_capital_humano_746', true);
INSERT INTO municipio (id, nombre, provinciaid, activo) VALUES ('DE_capital_humano_747', 'Pinar del Río', 'DE_capital_humano_746', true);
INSERT INTO municipio (id, nombre, provinciaid, activo) VALUES ('DE_capital_humano_1090', 'Marti', 'DE_capital_humano_1088', true);


--
-- TOC entry 2549 (class 0 OID 169658)
-- Dependencies: 1809
-- Data for Name: nivel_cultural; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO nivel_cultural (id, nombre, activo) VALUES ('DE_capital_humano_772', 'Nivel Superior', true);
INSERT INTO nivel_cultural (id, nombre, activo) VALUES ('DE_capital_humano_773', 'Tecnico Medio', true);
INSERT INTO nivel_cultural (id, nombre, activo) VALUES ('DE_capital_humano_1182', '12mo Grado', true);
INSERT INTO nivel_cultural (id, nombre, activo) VALUES ('DE_capital_humano_1183', '9no Grado', true);
INSERT INTO nivel_cultural (id, nombre, activo) VALUES ('DE_capital_humano_1184', '6to Grado', true);
INSERT INTO nivel_cultural (id, nombre, activo) VALUES ('DE_capital_humano_1185', 'Ninguno', true);
INSERT INTO nivel_cultural (id, nombre, activo) VALUES ('DE_capital_humano_1220', 'Obrero Calificado', true);


--
-- TOC entry 2550 (class 0 OID 169663)
-- Dependencies: 1810
-- Data for Name: nivel_preparacion; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO nivel_preparacion (id, activo, nombre) VALUES ('DE_capital_humano_777', true, 'Mala');
INSERT INTO nivel_preparacion (id, activo, nombre) VALUES ('DE_capital_humano_778', true, 'Media');
INSERT INTO nivel_preparacion (id, activo, nombre) VALUES ('DE_capital_humano_779', true, 'Buena');
INSERT INTO nivel_preparacion (id, activo, nombre) VALUES ('DE_capital_humano_780', true, 'Muy Buena');
INSERT INTO nivel_preparacion (id, activo, nombre) VALUES ('DE_capital_humano_1099', true, 'Regular');


--
-- TOC entry 2551 (class 0 OID 169668)
-- Dependencies: 1811
-- Data for Name: norma_juridica; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO norma_juridica (id, activo, nombre) VALUES ('DE_capital_humano_781', true, 'Norma Primera ');


--
-- TOC entry 2552 (class 0 OID 169673)
-- Dependencies: 1812
-- Data for Name: provincia; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO provincia (id, nombre, activo) VALUES ('DE_capital_humano_746', 'Pinar del Río', true);
INSERT INTO provincia (id, nombre, activo) VALUES ('DE_capital_humano_1088', 'Matanzas', true);


--
-- TOC entry 2553 (class 0 OID 169678)
-- Dependencies: 1813
-- Data for Name: registro_militar; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO registro_militar (id, nombre, activo) VALUES ('DE_capital_humano_753', 'Unidad Militar ', true);


--
-- TOC entry 2554 (class 0 OID 169687)
-- Dependencies: 1814
-- Data for Name: reparto; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO reparto (id, nombre, municipioid, activo) VALUES ('DE_capital_humano_749', 'Gtres', 'DE_capital_humano_748', 'true                                                                                                                                                                                                                                                           ');
INSERT INTO reparto (id, nombre, municipioid, activo) VALUES ('DE_capital_humano_750', 'Capo', 'DE_capital_humano_747', 'true                                                                                                                                                                                                                                                           ');
INSERT INTO reparto (id, nombre, municipioid, activo) VALUES ('DE_capital_humano_810', 'Hermanos Cruz', 'DE_capital_humano_747', 'true                                                                                                                                                                                                                                                           ');
INSERT INTO reparto (id, nombre, municipioid, activo) VALUES ('DE_capital_humano_811', 'Luis Lazo', 'DE_capital_humano_747', 'true                                                                                                                                                                                                                                                           ');
INSERT INTO reparto (id, nombre, municipioid, activo) VALUES ('DE_capital_humano_815', 'Las Alturas', 'DE_capital_humano_814', 'true                                                                                                                                                                                                                                                           ');


--
-- TOC entry 2555 (class 0 OID 169699)
-- Dependencies: 1815
-- Data for Name: sexo; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO sexo (id, nombre, activo) VALUES ('DE_capital_humano_755', 'Masculino', true);
INSERT INTO sexo (id, nombre, activo) VALUES ('DE_capital_humano_756', 'Femenino', true);


--
-- TOC entry 2577 (class 0 OID 170729)
-- Dependencies: 1837
-- Data for Name: sistema_pago; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO sistema_pago (id, nombre, activo) VALUES ('DE_capital_humano_943', 'Destajo', NULL);
INSERT INTO sistema_pago (id, nombre, activo) VALUES ('DE_capital_humano_944', 'Indicadores Especificos', NULL);
INSERT INTO sistema_pago (id, nombre, activo) VALUES ('DE_capital_humano_946', 'Indicadores de Eficiencia', NULL);


--
-- TOC entry 2556 (class 0 OID 169708)
-- Dependencies: 1816
-- Data for Name: talla; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_740', '40', 'DE_capital_humano_737', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_741', '42', 'DE_capital_humano_737', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_742', 'L', 'DE_capital_humano_738', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_743', 'XL', 'DE_capital_humano_738', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_744', '32', 'DE_capital_humano_739', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_745', '34', 'DE_capital_humano_739', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_808', 'S', 'DE_capital_humano_738', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_809', '39', 'DE_capital_humano_737', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_813', '28', 'DE_capital_humano_739', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_816', '44', 'DE_capital_humano_737', true);
INSERT INTO talla (id, valor, talla_tipoid, activo) VALUES ('DE_capital_humano_825', '43', 'DE_capital_humano_737', true);


--
-- TOC entry 2557 (class 0 OID 169713)
-- Dependencies: 1817
-- Data for Name: talla_tipo; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO talla_tipo (id, nombre, activo) VALUES ('DE_capital_humano_738', 'camisa.blusa', true);
INSERT INTO talla_tipo (id, nombre, activo) VALUES ('DE_capital_humano_739', 'pantalon.salla', true);
INSERT INTO talla_tipo (id, nombre, activo) VALUES ('DE_capital_humano_737', 'zapato', true);


--
-- TOC entry 2558 (class 0 OID 169734)
-- Dependencies: 1818
-- Data for Name: tipo; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--



--
-- TOC entry 2559 (class 0 OID 169739)
-- Dependencies: 1819
-- Data for Name: ubicacion_defensa_tipo; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_854', 'Unidades de Defensa', NULL, true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1222', 'No Incorporado', 'DE_capital_humano_854', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1249', 'Unidades Regulares', 'DE_capital_humano_854', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1251', 'Otras Unidades Regulares', 'DE_capital_humano_1249', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_855', 'B.P.D', 'DE_capital_humano_854', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1250', 'C.G.M Reserva Militar', 'DE_capital_humano_1249', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1252', 'B.P.D Situacion Exepcional ', 'DE_capital_humano_854', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1253', 'Grupo Hidrografico ANAV', 'DE_capital_humano_1252', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1254', 'Buque', 'DE_capital_humano_1252', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1255', 'Otras B.P.D Situacion Exepcional', 'DE_capital_humano_1252', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1256', 'M.T.T', 'DE_capital_humano_854', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1257', 'Peloton AGSM', 'DE_capital_humano_1256', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1258', 'Otras M.T.T', 'DE_capital_humano_1256', true);
INSERT INTO ubicacion_defensa_tipo (id, nombre, ubicacion_defensa_tipoid, activo) VALUES ('DE_capital_humano_1268', 'Oficial de las FAR', 'DE_capital_humano_854', true);


--
-- TOC entry 2560 (class 0 OID 169744)
-- Dependencies: 1820
-- Data for Name: ubicacion_excepcional; Type: TABLE DATA; Schema: nomencladores; Owner: postgres
--

INSERT INTO ubicacion_excepcional (id, nombre, activo) VALUES ('DE_capital_humano_761', 'En el Mar', true);
INSERT INTO ubicacion_excepcional (id, nombre, activo) VALUES ('DE_capital_humano_935', 'Torrero de faro', true);
INSERT INTO ubicacion_excepcional (id, nombre, activo) VALUES ('DE_capital_humano_936', 'En la Agruicultura', true);
INSERT INTO ubicacion_excepcional (id, nombre, activo) VALUES ('DE_capital_humano_937', 'En la Contruccion', true);
INSERT INTO ubicacion_excepcional (id, nombre, activo) VALUES ('DE_capital_humano_1248', 'Sin Ubicacion', true);


SET search_path = pago, pg_catalog;

--
-- TOC entry 2561 (class 0 OID 169749)
-- Dependencies: 1821
-- Data for Name: cliente; Type: TABLE DATA; Schema: pago; Owner: postgres
--

INSERT INTO cliente (id, activo, nombre) VALUES ('DE_capital_humano_955', true, 'Producción                                                                                                                                                                                                                                                     ');
INSERT INTO cliente (id, activo, nombre) VALUES ('DE_capital_humano_1104', true, 'Economía                                                                                                                                                                                                                                                       ');


--
-- TOC entry 2563 (class 0 OID 169763)
-- Dependencies: 1823
-- Data for Name: contrato; Type: TABLE DATA; Schema: pago; Owner: postgres
--

INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1138', 'DE_capital_humano_1130', false, 'DE_capital_humano_969', '2013-07-01 00:00:00', '2013-07-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1140', 'DE_capital_humano_1131', false, 'DE_capital_humano_805', '2013-07-01 00:00:00', '2013-08-29 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1144', 'DE_capital_humano_766', false, 'DE_capital_humano_960', '2013-07-01 00:00:00', '2013-09-19 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1146', 'DE_capital_humano_765', false, 'DE_capital_humano_952', '2013-07-01 00:00:00', '2013-12-31 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1164', 'DE_capital_humano_765', true, 'DE_capital_humano_806', '2013-07-01 00:00:00', '2013-11-14 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1166', 'DE_capital_humano_766', true, 'DE_capital_humano_969', '2013-07-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1168', 'DE_capital_humano_767', true, 'DE_capital_humano_805', '2013-07-01 00:00:00', '2013-09-25 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1172', 'DE_capital_humano_765', true, 'DE_capital_humano_960', '2013-07-01 00:00:00', '2013-11-21 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1174', 'DE_capital_humano_766', true, 'DE_capital_humano_802', '2013-07-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1176', 'DE_capital_humano_1129', true, 'DE_capital_humano_804', '2013-07-01 00:00:00', '2015-07-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1180', 'DE_capital_humano_1131', true, 'DE_capital_humano_952', '2013-07-01 00:00:00', '2013-09-19 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1214', 'DE_capital_humano_1130', false, 'DE_capital_humano_1213', '2013-07-03 00:00:00', '2013-07-03 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1216', 'DE_capital_humano_766', true, 'DE_capital_humano_1213', '2013-07-03 00:00:00', '2013-07-03 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1132', 'DE_capital_humano_765', false, 'DE_capital_humano_803', '2013-07-01 00:00:00', '2013-07-03 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1178', 'DE_capital_humano_1129', false, 'DE_capital_humano_803', '2013-07-01 00:00:00', '2013-07-03 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1217', 'DE_capital_humano_765', false, 'DE_capital_humano_803', '2013-07-31 00:00:00', '2013-07-03 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1218', 'DE_capital_humano_1130', true, 'DE_capital_humano_803', '2013-07-04 00:00:00', '2013-07-03 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1134', 'DE_capital_humano_766', false, 'DE_capital_humano_852', '2013-07-08 00:00:00', '0001-01-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1170', 'DE_capital_humano_766', true, 'DE_capital_humano_852', '2013-07-08 00:00:00', '0001-01-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1239', 'DE_capital_humano_766', true, 'DE_capital_humano_1237', '2013-07-11 00:00:00', '0001-01-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1241', 'DE_capital_humano_766', true, 'DE_capital_humano_1238', '2013-07-11 00:00:00', '0001-01-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1246', 'DE_capital_humano_765', true, 'DE_capital_humano_802', '2013-07-16 00:00:00', '2014-02-16 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1136', 'DE_capital_humano_767', false, 'DE_capital_humano_802', '2013-07-01 00:00:00', '2013-12-01 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1148', 'DE_capital_humano_767', false, 'DE_capital_humano_804', '2013-07-01 00:00:00', '2014-02-20 00:00:00');
INSERT INTO contrato (id, contrato_tipoid, activo, trabajadorid, fecha_inicio, fecha_final) VALUES ('DE_capital_humano_1142', 'DE_capital_humano_1129', false, 'DE_capital_humano_806', '2013-07-01 00:00:00', '2015-07-01 00:00:00');


--
-- TOC entry 2562 (class 0 OID 169754)
-- Dependencies: 1822
-- Data for Name: contratoooo; Type: TABLE DATA; Schema: pago; Owner: postgres
--

INSERT INTO contratoooo (id, clienteid, activo, nombre) VALUES ('DE_capital_humano_956', 'DE_capital_humano_955', true, 'Produccion  e ImasD                                                                                                                                                                                                                                            ');
INSERT INTO contratoooo (id, clienteid, activo, nombre) VALUES ('DE_capital_humano_1105', 'DE_capital_humano_955', true, 'Kire                                                                                                                                                                                                                                                           ');


--
-- TOC entry 2564 (class 0 OID 169772)
-- Dependencies: 1824
-- Data for Name: proyecto; Type: TABLE DATA; Schema: pago; Owner: postgres
--

INSERT INTO proyecto (id, monto, nombre, descripcion, areaid, codigo, contratooooid, activo, fecha_inicio, fecha_fin) VALUES ('DE_capital_humano_1022', 234, 'Kire', 'Este proyecto es una prueba.', 'DE_capital_humano_725', '12345', 'DE_capital_humano_956', true, '2013-06-27', '2013-07-31');
INSERT INTO proyecto (id, monto, nombre, descripcion, areaid, codigo, contratooooid, activo, fecha_inicio, fecha_fin) VALUES ('DE_capital_humano_958', 456789, 'Hermessss', 'gfhgf', 'DE_capital_humano_723', '0124', 'DE_capital_humano_956', true, '2013-06-24', '2013-12-24');


--
-- TOC entry 2565 (class 0 OID 169788)
-- Dependencies: 1825
-- Data for Name: reporte_pago; Type: TABLE DATA; Schema: pago; Owner: postgres
--

INSERT INTO reporte_pago (id, proyectoid, anno_mesid, activo, nombre) VALUES ('DE_capital_humano_1029', 'DE_capital_humano_1022', 'DE_capital_humano_864', true, 'Prueba');
INSERT INTO reporte_pago (id, proyectoid, anno_mesid, activo, nombre) VALUES ('DE_capital_humano_1106', 'DE_capital_humano_958', 'DE_capital_humano_864', true, 'Probando');


--
-- TOC entry 2568 (class 0 OID 169817)
-- Dependencies: 1828
-- Data for Name: trabajador_proyecto; Type: TABLE DATA; Schema: pago; Owner: postgres
--

INSERT INTO trabajador_proyecto (id, proyectoid, fecha, activo, trabajadorid) VALUES ('DE_capital_humano_1097', 'DE_capital_humano_1022', '2013-06-26', true, 'DE_capital_humano_802');
INSERT INTO trabajador_proyecto (id, proyectoid, fecha, activo, trabajadorid) VALUES ('DE_capital_humano_1231', 'DE_capital_humano_958', '2013-07-09', true, 'DE_capital_humano_802');
INSERT INTO trabajador_proyecto (id, proyectoid, fecha, activo, trabajadorid) VALUES ('DE_capital_humano_1232', 'DE_capital_humano_958', '2013-07-08', true, 'DE_capital_humano_803');
INSERT INTO trabajador_proyecto (id, proyectoid, fecha, activo, trabajadorid) VALUES ('DE_capital_humano_1233', 'DE_capital_humano_958', '2013-07-09', true, 'DE_capital_humano_852');
INSERT INTO trabajador_proyecto (id, proyectoid, fecha, activo, trabajadorid) VALUES ('DE_capital_humano_1234', 'DE_capital_humano_958', '2013-07-09', true, 'DE_capital_humano_805');
INSERT INTO trabajador_proyecto (id, proyectoid, fecha, activo, trabajadorid) VALUES ('DE_capital_humano_1235', 'DE_capital_humano_1022', '2013-07-09', true, 'DE_capital_humano_806');
INSERT INTO trabajador_proyecto (id, proyectoid, fecha, activo, trabajadorid) VALUES ('DE_capital_humano_1236', 'DE_capital_humano_1022', '2013-07-09', true, 'DE_capital_humano_952');


SET search_path = plantilla, pg_catalog;

--
-- TOC entry 2569 (class 0 OID 169826)
-- Dependencies: 1829
-- Data for Name: cargo; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO cargo (id, norma_juridicaid, categoria_ocupacionalid, nivel_preparacionid, clasificacion_d_iid, grupo_escalaid, activo, nombre) VALUES ('DE_capital_humano_787', 'DE_capital_humano_781', 'DE_capital_humano_770', 'DE_capital_humano_779', 'DE_capital_humano_782', 'DE_capital_humano_732', true, 'Tecnico A');
INSERT INTO cargo (id, norma_juridicaid, categoria_ocupacionalid, nivel_preparacionid, clasificacion_d_iid, grupo_escalaid, activo, nombre) VALUES ('DE_capital_humano_788', 'DE_capital_humano_781', 'DE_capital_humano_770', 'DE_capital_humano_779', 'DE_capital_humano_782', 'DE_capital_humano_732', true, 'Tecnico B');
INSERT INTO cargo (id, norma_juridicaid, categoria_ocupacionalid, nivel_preparacionid, clasificacion_d_iid, grupo_escalaid, activo, nombre) VALUES ('DE_capital_humano_786', 'DE_capital_humano_781', 'DE_capital_humano_771', 'DE_capital_humano_780', 'DE_capital_humano_783', 'DE_capital_humano_734', true, 'Director de Unidad II');
INSERT INTO cargo (id, norma_juridicaid, categoria_ocupacionalid, nivel_preparacionid, clasificacion_d_iid, grupo_escalaid, activo, nombre) VALUES ('DE_capital_humano_789', 'DE_capital_humano_781', 'DE_capital_humano_768', 'DE_capital_humano_780', 'DE_capital_humano_783', 'DE_capital_humano_932', true, 'Chofer A');
INSERT INTO cargo (id, norma_juridicaid, categoria_ocupacionalid, nivel_preparacionid, clasificacion_d_iid, grupo_escalaid, activo, nombre) VALUES ('DE_capital_humano_790', 'DE_capital_humano_781', 'DE_capital_humano_768', 'DE_capital_humano_779', 'DE_capital_humano_783', 'DE_capital_humano_932', true, 'Chofer B');
INSERT INTO cargo (id, norma_juridicaid, categoria_ocupacionalid, nivel_preparacionid, clasificacion_d_iid, grupo_escalaid, activo, nombre) VALUES ('DE_capital_humano_785', 'DE_capital_humano_781', 'DE_capital_humano_771', 'DE_capital_humano_779', 'DE_capital_humano_783', 'DE_capital_humano_932', true, 'Director de Unidad I');
INSERT INTO cargo (id, norma_juridicaid, categoria_ocupacionalid, nivel_preparacionid, clasificacion_d_iid, grupo_escalaid, activo, nombre) VALUES ('DE_capital_humano_784', 'DE_capital_humano_781', 'DE_capital_humano_771', 'DE_capital_humano_780', 'DE_capital_humano_783', 'DE_capital_humano_932', true, 'Gerentes');


--
-- TOC entry 2571 (class 0 OID 169847)
-- Dependencies: 1831
-- Data for Name: condecoracion; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO condecoracion (id, condecoracion_tipoid, activo) VALUES ('DE_capital_humano_962', 'DE_capital_humano_961', true);
INSERT INTO condecoracion (id, condecoracion_tipoid, activo) VALUES ('DE_capital_humano_1038', 'DE_capital_humano_1032', true);


--
-- TOC entry 2570 (class 0 OID 169838)
-- Dependencies: 1830
-- Data for Name: listado_cargos; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1153', 'DE_capital_humano_754', 'DE_capital_humano_787', 'DE_capital_humano_841', 1, true, 0);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1152', 'DE_capital_humano_754', 'DE_capital_humano_788', 'DE_capital_humano_841', 1, true, 0);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1160', 'DE_capital_humano_754', 'DE_capital_humano_785', 'DE_capital_humano_1150', 1, true, 0);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1158', 'DE_capital_humano_754', 'DE_capital_humano_786', 'DE_capital_humano_842', 1, true, 0);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1163', 'DE_capital_humano_754', 'DE_capital_humano_787', 'DE_capital_humano_725', 3, true, 3);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1154', 'DE_capital_humano_754', 'DE_capital_humano_785', 'DE_capital_humano_841', 1, true, 1);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1157', 'DE_capital_humano_754', 'DE_capital_humano_788', 'DE_capital_humano_842', 2, true, 1);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1156', 'DE_capital_humano_754', 'DE_capital_humano_787', 'DE_capital_humano_842', 10, true, 6);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1162', 'DE_capital_humano_754', 'DE_capital_humano_787', 'DE_capital_humano_723', 3, true, 0);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1155', 'DE_capital_humano_754', 'DE_capital_humano_789', 'DE_capital_humano_842', 1, true, 1);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1159', 'DE_capital_humano_754', 'DE_capital_humano_787', 'DE_capital_humano_1150', 4, true, 3);
INSERT INTO listado_cargos (id, resolucionid, cargoid, areaid, cantidad_plazas, activo, existencia) VALUES ('DE_capital_humano_1161', 'DE_capital_humano_754', 'DE_capital_humano_785', 'DE_capital_humano_723', 1, true, 0);


--
-- TOC entry 2573 (class 0 OID 169864)
-- Dependencies: 1833
-- Data for Name: oficial; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO oficial (trabajadorid, grado_militarid, cargo_militarid, fecha_ingreso, activo) VALUES ('DE_capital_humano_802', 'DE_capital_humano_731', 'DE_capital_humano_726', '2013-06-02', true);
INSERT INTO oficial (trabajadorid, grado_militarid, cargo_militarid, fecha_ingreso, activo) VALUES ('DE_capital_humano_805', 'DE_capital_humano_730', 'DE_capital_humano_1048', '2013-07-02', true);


--
-- TOC entry 2566 (class 0 OID 169798)
-- Dependencies: 1826
-- Data for Name: plantilla; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1165', 'DE_capital_humano_1164', 'DE_capital_humano_1159', true, 'DE_capital_humano_939', 'DE_capital_humano_943', 'DE_capital_humano_949');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1167', 'DE_capital_humano_1166', 'DE_capital_humano_1161', true, 'DE_capital_humano_938', 'DE_capital_humano_944', 'DE_capital_humano_949');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1169', 'DE_capital_humano_1168', 'DE_capital_humano_1162', true, 'DE_capital_humano_938', 'DE_capital_humano_944', 'DE_capital_humano_950');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1173', 'DE_capital_humano_1172', 'DE_capital_humano_1153', true, 'DE_capital_humano_1103', 'DE_capital_humano_944', 'DE_capital_humano_950');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1175', 'DE_capital_humano_1174', 'DE_capital_humano_1156', true, 'DE_capital_humano_1103', 'DE_capital_humano_946', 'DE_capital_humano_949');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1177', 'DE_capital_humano_1176', 'DE_capital_humano_1152', true, 'DE_capital_humano_1103', 'DE_capital_humano_946', 'DE_capital_humano_951');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1181', 'DE_capital_humano_1180', 'DE_capital_humano_1162', true, 'DE_capital_humano_938', 'DE_capital_humano_946', 'DE_capital_humano_951');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1215', 'DE_capital_humano_1216', 'DE_capital_humano_1156', true, 'DE_capital_humano_1103', 'DE_capital_humano_946', 'DE_capital_humano_949');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1179', 'DE_capital_humano_1218', 'DE_capital_humano_1158', true, 'DE_capital_humano_938', 'DE_capital_humano_944', 'DE_capital_humano_950');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1171', 'DE_capital_humano_1134', 'DE_capital_humano_1157', true, 'DE_capital_humano_938', 'DE_capital_humano_944', 'DE_capital_humano_950');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1240', 'DE_capital_humano_1239', 'DE_capital_humano_1156', true, 'DE_capital_humano_1103', 'DE_capital_humano_944', 'DE_capital_humano_950');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1242', 'DE_capital_humano_1241', 'DE_capital_humano_1156', true, 'DE_capital_humano_938', 'DE_capital_humano_946', 'DE_capital_humano_949');
INSERT INTO plantilla (id, contratoid, listado_cargosid, activo, fpago_id, spago_id, htrabajo_id) VALUES ('DE_capital_humano_1247', 'DE_capital_humano_1246', 'DE_capital_humano_1162', true, 'DE_capital_humano_938', 'DE_capital_humano_944', 'DE_capital_humano_949');


--
-- TOC entry 2572 (class 0 OID 169852)
-- Dependencies: 1832
-- Data for Name: resolucion; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO resolucion (id, activo, nombre, anno, descripcion, dir, nombre_file) VALUES ('DE_capital_humano_754', true, 'Normas de Seguridad Informática k                                                                                                                                                                                                                              ', 2013, '<font face="helvetica">Este es el Reglamento Informático 2012/2013</font><br>          ', 'C:/xampp/htdocs/CapitalHumano/SubSystems/Plantilla/Resolucion/Resoluciones/2013/', 'Reglamento informacion 2012.pdf                                                                                                                                                                         ');


--
-- TOC entry 2567 (class 0 OID 169803)
-- Dependencies: 1827
-- Data for Name: trabajador; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_803', 5646, '98746512301', 'Elvis', 'Geas', 'Blech', '1986-12-31', 'dfj', 'DE_capital_humano_762', 'DE_capital_humano_755', 'DE_capital_humano_775', 1.67999995, 74, 'DE_capital_humano_742', 'DE_capital_humano_745', 'DE_capital_humano_816', '9874561', 'DE_capital_humano_810', 'DE_capital_humano_752', 'dfbdj', 'DE_capital_humano_773', 'DE_capital_humano_760', 'DE_capital_humano_936', false, 'DE_capital_humano_753', true, 'hjdf', '', '', 1001, '2013-06-11', 119, 'Elvis Geas Blech', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_804', 44678, '92102021914', 'Dianelys', 'Martinez', 'Torres', '1992-10-20', 'Delfin', 'DE_capital_humano_807', 'DE_capital_humano_756', 'DE_capital_humano_775', 1.62, 50, 'DE_capital_humano_808', 'DE_capital_humano_813', 'DE_capital_humano_809', '755555', 'DE_capital_humano_811', 'DE_capital_humano_812', 'km7 Luis Lazo', 'DE_capital_humano_773', 'DE_capital_humano_760', 'DE_capital_humano_937', false, 'DE_capital_humano_753', true, 'Tiany', '', '', 1002, '2013-06-11', 179, 'Dianelys Martinez Torres', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_806', 1818, '90120120912', 'Kireny', 'Acuña', 'Crespo', '1990-12-01', 'Isidro Rolando', 'DE_capital_humano_762', 'DE_capital_humano_756', 'DE_capital_humano_776', 1.62, 58, 'DE_capital_humano_742', 'DE_capital_humano_744', 'DE_capital_humano_809', '765644', 'DE_capital_humano_810', 'DE_capital_humano_812', 'Calle 4ta final', 'DE_capital_humano_773', 'DE_capital_humano_760', 'DE_capital_humano_761', false, 'DE_capital_humano_753', true, 'Maria de los Ángeles', '', '', 1010, '2013-06-12', 299, 'Kireny Acuña Crespo', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_960', 8979265, '45612378915', 'Pepe', 'Vaez', 'Lift', '1987-06-24', 'jkbdfk', 'DE_capital_humano_762', 'DE_capital_humano_755', 'DE_capital_humano_775', 1.20000005, 89, 'DE_capital_humano_743', 'DE_capital_humano_745', 'DE_capital_humano_741', '789542', 'DE_capital_humano_750', 'DE_capital_humano_752', 'jksdf skjskdf slkdjas', 'DE_capital_humano_772', 'DE_capital_humano_1221', 'DE_capital_humano_935', false, 'DE_capital_humano_753', true, 'Gtwkdo', '', '', 1013, '2013-06-24', 179, 'Pepe Vaez Lift', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_969', 564, '87455654715', 'Petra', 'Kens', 'Rou', '1986-12-31', 'kdml', 'DE_capital_humano_762', 'DE_capital_humano_756', 'DE_capital_humano_775', 1.70000005, 65, 'DE_capital_humano_742', 'DE_capital_humano_745', 'DE_capital_humano_809', '654123', 'DE_capital_humano_810', 'DE_capital_humano_752', 'ksdjf dsjkf hdifjdfklhd', 'DE_capital_humano_772', 'DE_capital_humano_1221', 'DE_capital_humano_935', false, 'DE_capital_humano_753', true, 'hjfdufh', '', '', 1014, '2013-06-24', 239, 'Petra Kens Rou', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_802', 214, '86123001707', 'Eduardo ', 'Valdes', 'Inerarte', '1986-12-31', 'Eduardo', 'DE_capital_humano_762', 'DE_capital_humano_755', 'DE_capital_humano_774', 1.85000002, 85, 'DE_capital_humano_742', 'DE_capital_humano_744', 'DE_capital_humano_740', '725483', 'DE_capital_humano_750', 'DE_capital_humano_751', 'Esta es', 'DE_capital_humano_772', 'DE_capital_humano_1221', 'DE_capital_humano_761', false, 'DE_capital_humano_753', true, 'Rayte', '', '', 1000, '2013-06-11', 59, 'Eduardo Valdes Inerarte', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_852', 5423, '15424784512', 'Juan', 'Perez', 'Gomez', '1973-07-03', 'Juan', 'DE_capital_humano_763', 'DE_capital_humano_755', 'DE_capital_humano_774', 1.87, 54, 'DE_capital_humano_743', 'DE_capital_humano_745', 'DE_capital_humano_825', '564568', 'DE_capital_humano_750', 'DE_capital_humano_751', 'hsfsdfbdkj fdjkfndk ', 'DE_capital_humano_772', 'DE_capital_humano_759', 'DE_capital_humano_937', false, 'DE_capital_humano_753', true, 'Juana', 'sin motivos', 'sin destino', 1011, '2013-06-04', 11, 'Juan Perez Gomez', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES (' ', 564, '87455654715', 'Alberto', 'Dias', 'Rou', '1986-12-31', 'kdml', 'DE_capital_humano_762', 'DE_capital_humano_756', 'DE_capital_humano_775', 1.70000005, 65, 'DE_capital_humano_742', 'DE_capital_humano_745', 'DE_capital_humano_809', '654123', 'DE_capital_humano_810', 'DE_capital_humano_752', 'ksdjf dsjkf hdifjdfklhd', 'DE_capital_humano_772', 'DE_capital_humano_1221', 'DE_capital_humano_935', false, 'DE_capital_humano_753', false, 'hjfdufh', 'DE_capital_humano_1191', 'DE_capital_humano_1208', 1014, '2013-06-24', 239, 'Alberto Dias', '2013-07-16');
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_1237', 4567, '12365478963', 'Hernesto ', 'Genm', 'Hysd', '1979-07-11', 'asdasdasd', 'DE_capital_humano_764', 'DE_capital_humano_755', 'DE_capital_humano_775', 3.20000005, 98, 'DE_capital_humano_743', 'DE_capital_humano_745', 'DE_capital_humano_809', '456789', 'DE_capital_humano_810', 'DE_capital_humano_752', 'sdsdsad asd asd ', 'DE_capital_humano_1183', 'DE_capital_humano_1221', 'DE_capital_humano_935', false, 'DE_capital_humano_753', true, 'sd sadasdas', '0', '0', 1016, '2013-07-11', 6, 'Hernesto  Genm Hysd', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_1238', 456, '12457896321', 'Yakelin', 'jnfkdjn', 'djfnksdfjn', '1989-04-11', 'dfmksdfm', 'DE_capital_humano_807', 'DE_capital_humano_756', 'DE_capital_humano_775', 1.64999998, 65, 'DE_capital_humano_743', 'DE_capital_humano_745', 'DE_capital_humano_816', '123456', 'DE_capital_humano_810', 'DE_capital_humano_752', 'kdjnkdj', 'DE_capital_humano_772', 'DE_capital_humano_760', 'DE_capital_humano_936', false, 'DE_capital_humano_753', true, 'mfmksdf', '0', '0', 1017, '2013-07-11', 56, 'Yakelin jnfkdjn djfnksdfjn', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_1243', 564, '87455654715', 'Laura', 'Kens', 'Rou', '1986-12-31', 'kdml', 'DE_capital_humano_762', 'DE_capital_humano_756', 'DE_capital_humano_775', 1.70000005, 65, 'DE_capital_humano_742', 'DE_capital_humano_745', 'DE_capital_humano_809', '654123', 'DE_capital_humano_810', 'DE_capital_humano_752', 'ksdjf dsjkf hdifjdfklhd', 'DE_capital_humano_772', 'DE_capital_humano_1221', 'DE_capital_humano_935', false, 'DE_capital_humano_753', false, 'hjfdufh', 'DE_capital_humano_1195', 'DE_capital_humano_1207', 1014, '2013-06-24', 239, 'Laura Kens Rou', '2013-05-16');
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_1245', 51312, '65748392016', 'Pedro', 'Hyes', 'Seyh', '1986-12-31', 'g ljlkj olknm ', 'DE_capital_humano_762', 'DE_capital_humano_756', 'DE_capital_humano_775', 2.0999999, 87, 'DE_capital_humano_808', 'DE_capital_humano_745', 'DE_capital_humano_809', '514651', 'DE_capital_humano_750', 'DE_capital_humano_752', 'jhvj jhkj kn', 'DE_capital_humano_1183', 'DE_capital_humano_759', 'DE_capital_humano_936', false, 'DE_capital_humano_753', true, 'jhgjg kh', '0', '0', 1015, '2013-07-03', 11, 'Pedro Hyes Seyh', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_952', 123123, '78350938359', 'Juanquin', 'jknlasdlj', 'jnsdnsl', '1965-06-24', 'sdasda', 'DE_capital_humano_763', 'DE_capital_humano_755', 'DE_capital_humano_774', 5.19999981, 54, 'DE_capital_humano_742', 'DE_capital_humano_744', 'DE_capital_humano_740', '456789', 'DE_capital_humano_749', 'DE_capital_humano_751', 'kmdsdms  msmds ', 'DE_capital_humano_772', 'DE_capital_humano_1221', 'DE_capital_humano_935', false, 'DE_capital_humano_753', true, 'dssdsd', '', '', 1012, '2013-06-24', 59, 'Juaquin jknlasdlj jnsdnsl', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_1213', 51312, '65748392016', 'Raul', 'Hyes', 'Seyh', '1986-12-31', 'g ljlkj olknm ', 'DE_capital_humano_762', 'DE_capital_humano_756', 'DE_capital_humano_775', 2.0999999, 87, 'DE_capital_humano_808', 'DE_capital_humano_745', 'DE_capital_humano_809', '514651', 'DE_capital_humano_750', 'DE_capital_humano_752', 'jhvj jhkj kn', 'DE_capital_humano_1183', 'DE_capital_humano_759', 'DE_capital_humano_936', false, 'DE_capital_humano_753', true, 'jhgjg kh', '0', '0', 1015, '2013-07-03', 11, 'Raul Hyes Seyh', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_805', 3456, '91052324100', 'Leodán', 'Morales', 'González', '1991-05-23', 'Leonardo', 'DE_capital_humano_762', 'DE_capital_humano_755', 'DE_capital_humano_776', 1.74000001, 71, 'DE_capital_humano_742', 'DE_capital_humano_744', 'DE_capital_humano_816', '798172', 'DE_capital_humano_815', 'DE_capital_humano_812', 'Edif 4,Apto 10', 'DE_capital_humano_773', 'DE_capital_humano_760', 'DE_capital_humano_937', false, 'DE_capital_humano_753', true, 'Iraida', 'sin motivos', 'sin destino', 1009, '2013-06-04', 239, 'Leodán Morales González', NULL);
INSERT INTO trabajador (id, codigo_nomina, no_identidad, nombre, apellido_1, apellido_2, fecha_nacimiento, nombre_padre, estado_civilid, sexoid, color_pielid, estatura, peso, talla_camisa_blusa, talla_pantalon_saya, talla_zapato, telefono, repartoid, lugar_procedenciaid, direccion, nivel_culturalid, integracionid, ubicacion_excepcionalid, sancionado, registro_militarid, activo, nombre_madre, mbaja, dbaja, codigo, fecha_inicio, tiempo, nombre_completo, dia_de_baja) VALUES ('DE_capital_humano_1244', 51312, '65748392016', 'Yoel', 'Hyes', 'Seyh', '1986-12-31', 'g ljlkj olknm ', 'DE_capital_humano_762', 'DE_capital_humano_756', 'DE_capital_humano_775', 2.0999999, 87, 'DE_capital_humano_808', 'DE_capital_humano_745', 'DE_capital_humano_809', '514651', 'DE_capital_humano_750', 'DE_capital_humano_752', 'jhvj jhkj kn', 'DE_capital_humano_1183', 'DE_capital_humano_759', 'DE_capital_humano_936', false, 'DE_capital_humano_753', true, 'jhgjg kh', '0', '0', 1015, '2013-07-03', 11, 'Yoel Hyes Seyh', NULL);


--
-- TOC entry 2574 (class 0 OID 169876)
-- Dependencies: 1834
-- Data for Name: trabajador_condecoracion; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO trabajador_condecoracion (id, trabajadorid, condecoracionid, activo) VALUES ('DE_capital_humano_1040', 'DE_capital_humano_806', 'DE_capital_humano_1038', true);
INSERT INTO trabajador_condecoracion (id, trabajadorid, condecoracionid, activo) VALUES ('DE_capital_humano_1224', 'DE_capital_humano_803', 'DE_capital_humano_1038', true);
INSERT INTO trabajador_condecoracion (id, trabajadorid, condecoracionid, activo) VALUES ('DE_capital_humano_1225', 'DE_capital_humano_804', 'DE_capital_humano_962', true);
INSERT INTO trabajador_condecoracion (id, trabajadorid, condecoracionid, activo) VALUES ('DE_capital_humano_1226', 'DE_capital_humano_805', 'DE_capital_humano_962', true);
INSERT INTO trabajador_condecoracion (id, trabajadorid, condecoracionid, activo) VALUES ('DE_capital_humano_1227', 'DE_capital_humano_852', 'DE_capital_humano_1038', true);
INSERT INTO trabajador_condecoracion (id, trabajadorid, condecoracionid, activo) VALUES ('DE_capital_humano_1228', 'DE_capital_humano_952', 'DE_capital_humano_962', true);
INSERT INTO trabajador_condecoracion (id, trabajadorid, condecoracionid, activo) VALUES ('DE_capital_humano_1229', 'DE_capital_humano_802', 'DE_capital_humano_962', true);
INSERT INTO trabajador_condecoracion (id, trabajadorid, condecoracionid, activo) VALUES ('DE_capital_humano_1230', 'DE_capital_humano_802', 'DE_capital_humano_1038', true);


--
-- TOC entry 2575 (class 0 OID 169894)
-- Dependencies: 1835
-- Data for Name: ubicacion_defensa; Type: TABLE DATA; Schema: plantilla; Owner: postgres
--

INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_966', 'DE_capital_humano_855', 'DE_capital_humano_952', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_964', 'DE_capital_humano_1253', 'DE_capital_humano_802', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_965', 'DE_capital_humano_1257', 'DE_capital_humano_960', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1259', 'DE_capital_humano_1258', 'DE_capital_humano_803', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1260', 'DE_capital_humano_1250', 'DE_capital_humano_804', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1261', 'DE_capital_humano_1254', 'DE_capital_humano_969', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1262', 'DE_capital_humano_1256', 'DE_capital_humano_1237', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1263', 'DE_capital_humano_1252', 'DE_capital_humano_1238', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1264', 'DE_capital_humano_1222', 'DE_capital_humano_1245', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1265', 'DE_capital_humano_1222', 'DE_capital_humano_1213', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1266', 'DE_capital_humano_1254', 'DE_capital_humano_1244', 'ture                                                                                                                                                                                                                                                           ');
INSERT INTO ubicacion_defensa (id, ubicacion_defensa_tipoid, trabajadorid, activo) VALUES ('DE_capital_humano_1267', 'DE_capital_humano_1258', 'DE_capital_humano_1243', 'ture                                                                                                                                                                                                                                                           ');


SET search_path = utiles, pg_catalog;

--
-- TOC entry 2579 (class 0 OID 179346)
-- Dependencies: 1886
-- Data for Name: update_time; Type: TABLE DATA; Schema: utiles; Owner: postgres
--

INSERT INTO update_time (id, update_mes) VALUES ('DE_capital_humano_1219', true);


SET search_path = clone, pg_catalog;

--
-- TOC entry 2378 (class 2606 OID 169904)
-- Dependencies: 1787 1787
-- Name: bd_pkey; Type: CONSTRAINT; Schema: clone; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY config
    ADD CONSTRAINT bd_pkey PRIMARY KEY (id);


SET search_path = nomencladores, pg_catalog;

--
-- TOC entry 2380 (class 2606 OID 169906)
-- Dependencies: 1789 1789
-- Name: agencia_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY agencia
    ADD CONSTRAINT agencia_pkey PRIMARY KEY (id);


--
-- TOC entry 2388 (class 2606 OID 169908)
-- Dependencies: 1793 1793
-- Name: anno_mes_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY anno_mes
    ADD CONSTRAINT anno_mes_pkey PRIMARY KEY (id);


--
-- TOC entry 2386 (class 2606 OID 169910)
-- Dependencies: 1792 1792
-- Name: anno_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY anno
    ADD CONSTRAINT anno_pkey PRIMARY KEY (id);


--
-- TOC entry 2382 (class 2606 OID 169912)
-- Dependencies: 1790 1790
-- Name: area_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY area
    ADD CONSTRAINT area_pkey PRIMARY KEY (id);


--
-- TOC entry 2392 (class 2606 OID 169914)
-- Dependencies: 1795 1795
-- Name: cargo_militar_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY cargo_militar
    ADD CONSTRAINT cargo_militar_pkey PRIMARY KEY (id);


--
-- TOC entry 2394 (class 2606 OID 169916)
-- Dependencies: 1796 1796
-- Name: categoria_ocupacional_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY categoria_ocupacional
    ADD CONSTRAINT categoria_ocupacional_pkey PRIMARY KEY (id);


--
-- TOC entry 2396 (class 2606 OID 169918)
-- Dependencies: 1797 1797
-- Name: clasificacion_d_i_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY clasificacion_d_i
    ADD CONSTRAINT clasificacion_d_i_pkey PRIMARY KEY (id);


--
-- TOC entry 2398 (class 2606 OID 169920)
-- Dependencies: 1798 1798
-- Name: color_piel_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY color_piel
    ADD CONSTRAINT color_piel_pkey PRIMARY KEY (id);


--
-- TOC entry 2400 (class 2606 OID 169922)
-- Dependencies: 1799 1799
-- Name: condecoracion_tipo_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY condecoracion_tipo
    ADD CONSTRAINT condecoracion_tipo_pkey PRIMARY KEY (id);


--
-- TOC entry 2402 (class 2606 OID 169924)
-- Dependencies: 1800 1800
-- Name: contrato_tipo_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY contrato_tipo
    ADD CONSTRAINT contrato_tipo_pkey PRIMARY KEY (id);


--
-- TOC entry 2384 (class 2606 OID 169926)
-- Dependencies: 1791 1791
-- Name: empresa_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY empresa
    ADD CONSTRAINT empresa_pkey PRIMARY KEY (id);


--
-- TOC entry 2404 (class 2606 OID 169928)
-- Dependencies: 1802 1802
-- Name: estado_civil_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY estado_civil
    ADD CONSTRAINT estado_civil_pkey PRIMARY KEY (id);


--
-- TOC entry 2472 (class 2606 OID 170748)
-- Dependencies: 1836 1836
-- Name: forma_pago_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY forma_pago
    ADD CONSTRAINT forma_pago_pkey PRIMARY KEY (id);


--
-- TOC entry 2406 (class 2606 OID 169930)
-- Dependencies: 1803 1803
-- Name: grado_militar_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY grado_militar
    ADD CONSTRAINT grado_militar_pkey PRIMARY KEY (id);


--
-- TOC entry 2408 (class 2606 OID 169932)
-- Dependencies: 1804 1804
-- Name: grupo_escala_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY grupo_escala
    ADD CONSTRAINT grupo_escala_pkey PRIMARY KEY (id);


--
-- TOC entry 2476 (class 2606 OID 170755)
-- Dependencies: 1838 1838
-- Name: horario_trabajo_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY horario_trabajo
    ADD CONSTRAINT horario_trabajo_pkey PRIMARY KEY (id);


--
-- TOC entry 2410 (class 2606 OID 169934)
-- Dependencies: 1805 1805
-- Name: integracion_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY integracion
    ADD CONSTRAINT integracion_pkey PRIMARY KEY (id);


--
-- TOC entry 2412 (class 2606 OID 169936)
-- Dependencies: 1806 1806
-- Name: lugar_procedencia_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY lugar_procedencia
    ADD CONSTRAINT lugar_procedencia_pkey PRIMARY KEY (id);


--
-- TOC entry 2390 (class 2606 OID 169938)
-- Dependencies: 1794 1794
-- Name: mes_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY mes
    ADD CONSTRAINT mes_pkey PRIMARY KEY (id);


--
-- TOC entry 2414 (class 2606 OID 169940)
-- Dependencies: 1808 1808
-- Name: municipio_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY municipio
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (id);


--
-- TOC entry 2416 (class 2606 OID 169942)
-- Dependencies: 1809 1809
-- Name: nivel_cultural_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY nivel_cultural
    ADD CONSTRAINT nivel_cultural_pkey PRIMARY KEY (id);


--
-- TOC entry 2418 (class 2606 OID 169944)
-- Dependencies: 1810 1810
-- Name: nivel_preparacion_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY nivel_preparacion
    ADD CONSTRAINT nivel_preparacion_pkey PRIMARY KEY (id);


--
-- TOC entry 2420 (class 2606 OID 169946)
-- Dependencies: 1811 1811
-- Name: norma_juridica_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY norma_juridica
    ADD CONSTRAINT norma_juridica_pkey PRIMARY KEY (id);


--
-- TOC entry 2422 (class 2606 OID 169948)
-- Dependencies: 1812 1812
-- Name: provincia_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY provincia
    ADD CONSTRAINT provincia_pkey PRIMARY KEY (id);


--
-- TOC entry 2424 (class 2606 OID 169950)
-- Dependencies: 1813 1813
-- Name: registro_militar_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY registro_militar
    ADD CONSTRAINT registro_militar_pkey PRIMARY KEY (id);


--
-- TOC entry 2426 (class 2606 OID 169952)
-- Dependencies: 1814 1814
-- Name: reparto_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY reparto
    ADD CONSTRAINT reparto_pkey PRIMARY KEY (id);


--
-- TOC entry 2428 (class 2606 OID 169954)
-- Dependencies: 1815 1815
-- Name: sexo_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY sexo
    ADD CONSTRAINT sexo_pkey PRIMARY KEY (id);


--
-- TOC entry 2474 (class 2606 OID 170757)
-- Dependencies: 1837 1837
-- Name: sistema_pago_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY sistema_pago
    ADD CONSTRAINT sistema_pago_pkey PRIMARY KEY (id);


--
-- TOC entry 2430 (class 2606 OID 169956)
-- Dependencies: 1816 1816
-- Name: talla_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY talla
    ADD CONSTRAINT talla_pkey PRIMARY KEY (id);


--
-- TOC entry 2432 (class 2606 OID 169958)
-- Dependencies: 1817 1817
-- Name: talla_tipo_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY talla_tipo
    ADD CONSTRAINT talla_tipo_pkey PRIMARY KEY (id);


--
-- TOC entry 2434 (class 2606 OID 169960)
-- Dependencies: 1818 1818
-- Name: tipo_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY tipo
    ADD CONSTRAINT tipo_pkey PRIMARY KEY (id);


--
-- TOC entry 2436 (class 2606 OID 169962)
-- Dependencies: 1819 1819
-- Name: ubicacion_defensa_tipo_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY ubicacion_defensa_tipo
    ADD CONSTRAINT ubicacion_defensa_tipo_pkey PRIMARY KEY (id);


--
-- TOC entry 2438 (class 2606 OID 169964)
-- Dependencies: 1820 1820
-- Name: ubicacion_excepcional_pkey; Type: CONSTRAINT; Schema: nomencladores; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY ubicacion_excepcional
    ADD CONSTRAINT ubicacion_excepcional_pkey PRIMARY KEY (id);


SET search_path = pago, pg_catalog;

--
-- TOC entry 2440 (class 2606 OID 169966)
-- Dependencies: 1821 1821
-- Name: cliente_pkey; Type: CONSTRAINT; Schema: pago; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- TOC entry 2444 (class 2606 OID 169968)
-- Dependencies: 1823 1823
-- Name: contrato_pkey; Type: CONSTRAINT; Schema: pago; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY contrato
    ADD CONSTRAINT contrato_pkey PRIMARY KEY (id);


--
-- TOC entry 2442 (class 2606 OID 169970)
-- Dependencies: 1822 1822
-- Name: contratoooo_pkey; Type: CONSTRAINT; Schema: pago; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY contratoooo
    ADD CONSTRAINT contratoooo_pkey PRIMARY KEY (id);


--
-- TOC entry 2446 (class 2606 OID 169972)
-- Dependencies: 1824 1824
-- Name: proyecto_pkey; Type: CONSTRAINT; Schema: pago; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY proyecto
    ADD CONSTRAINT proyecto_pkey PRIMARY KEY (id);


--
-- TOC entry 2448 (class 2606 OID 169974)
-- Dependencies: 1825 1825
-- Name: reporte_pago_pkey; Type: CONSTRAINT; Schema: pago; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY reporte_pago
    ADD CONSTRAINT reporte_pago_pkey PRIMARY KEY (id);


--
-- TOC entry 2456 (class 2606 OID 169976)
-- Dependencies: 1828 1828
-- Name: trabajador_proyecto_pkey; Type: CONSTRAINT; Schema: pago; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY trabajador_proyecto
    ADD CONSTRAINT trabajador_proyecto_pkey PRIMARY KEY (id);


SET search_path = plantilla, pg_catalog;

--
-- TOC entry 2458 (class 2606 OID 169978)
-- Dependencies: 1829 1829
-- Name: cargo_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY cargo
    ADD CONSTRAINT cargo_pkey PRIMARY KEY (id);


--
-- TOC entry 2460 (class 2606 OID 169980)
-- Dependencies: 1830 1830
-- Name: cargo_real_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY listado_cargos
    ADD CONSTRAINT cargo_real_pkey PRIMARY KEY (id);


--
-- TOC entry 2462 (class 2606 OID 169982)
-- Dependencies: 1831 1831
-- Name: condecoracion_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY condecoracion
    ADD CONSTRAINT condecoracion_pkey PRIMARY KEY (id);


--
-- TOC entry 2466 (class 2606 OID 169984)
-- Dependencies: 1833 1833
-- Name: oficial_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY oficial
    ADD CONSTRAINT oficial_pkey PRIMARY KEY (trabajadorid);


--
-- TOC entry 2452 (class 2606 OID 169986)
-- Dependencies: 1826 1826
-- Name: plantilla_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY plantilla
    ADD CONSTRAINT plantilla_pkey PRIMARY KEY (id);


--
-- TOC entry 2464 (class 2606 OID 169988)
-- Dependencies: 1832 1832
-- Name: resolucion_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY resolucion
    ADD CONSTRAINT resolucion_pkey PRIMARY KEY (id);


--
-- TOC entry 2468 (class 2606 OID 169990)
-- Dependencies: 1834 1834
-- Name: trabajador_condecoracion_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY trabajador_condecoracion
    ADD CONSTRAINT trabajador_condecoracion_pkey PRIMARY KEY (id);


--
-- TOC entry 2454 (class 2606 OID 169992)
-- Dependencies: 1827 1827
-- Name: trabajador_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT trabajador_pkey PRIMARY KEY (id);


--
-- TOC entry 2470 (class 2606 OID 169994)
-- Dependencies: 1835 1835
-- Name: ubicacion_defensa_pkey; Type: CONSTRAINT; Schema: plantilla; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY ubicacion_defensa
    ADD CONSTRAINT ubicacion_defensa_pkey PRIMARY KEY (id);


SET search_path = utiles, pg_catalog;

--
-- TOC entry 2478 (class 2606 OID 179354)
-- Dependencies: 1886 1886
-- Name: update_time_pkey; Type: CONSTRAINT; Schema: utiles; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY update_time
    ADD CONSTRAINT update_time_pkey PRIMARY KEY (id);


SET search_path = plantilla, pg_catalog;

--
-- TOC entry 2449 (class 1259 OID 170763)
-- Dependencies: 1826
-- Name: fki_horario; Type: INDEX; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_horario ON plantilla USING btree (htrabajo_id);


--
-- TOC entry 2450 (class 1259 OID 170769)
-- Dependencies: 1826
-- Name: fki_spago; Type: INDEX; Schema: plantilla; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_spago ON plantilla USING btree (spago_id);


SET search_path = nomencladores, pg_catalog;

--
-- TOC entry 2479 (class 2606 OID 169995)
-- Dependencies: 1791 1789 2383
-- Name: fkagencia277959; Type: FK CONSTRAINT; Schema: nomencladores; Owner: postgres
--

ALTER TABLE ONLY agencia
    ADD CONSTRAINT fkagencia277959 FOREIGN KEY (empresaid) REFERENCES empresa(id);


--
-- TOC entry 2481 (class 2606 OID 170000)
-- Dependencies: 1792 1793 2385
-- Name: fkanno_mes241712; Type: FK CONSTRAINT; Schema: nomencladores; Owner: postgres
--

ALTER TABLE ONLY anno_mes
    ADD CONSTRAINT fkanno_mes241712 FOREIGN KEY (annoid) REFERENCES anno(id);


--
-- TOC entry 2482 (class 2606 OID 170005)
-- Dependencies: 1794 1793 2389
-- Name: fkanno_mes379308; Type: FK CONSTRAINT; Schema: nomencladores; Owner: postgres
--

ALTER TABLE ONLY anno_mes
    ADD CONSTRAINT fkanno_mes379308 FOREIGN KEY (mesid) REFERENCES mes(id);


--
-- TOC entry 2480 (class 2606 OID 170010)
-- Dependencies: 1789 1790 2379
-- Name: fkarea837579; Type: FK CONSTRAINT; Schema: nomencladores; Owner: postgres
--

ALTER TABLE ONLY area
    ADD CONSTRAINT fkarea837579 FOREIGN KEY (agenciaid) REFERENCES agencia(id);


--
-- TOC entry 2483 (class 2606 OID 170015)
-- Dependencies: 1812 1808 2421
-- Name: fkmunicipio833534; Type: FK CONSTRAINT; Schema: nomencladores; Owner: postgres
--

ALTER TABLE ONLY municipio
    ADD CONSTRAINT fkmunicipio833534 FOREIGN KEY (provinciaid) REFERENCES provincia(id);


--
-- TOC entry 2484 (class 2606 OID 170020)
-- Dependencies: 1808 1814 2413
-- Name: fkreparto752927; Type: FK CONSTRAINT; Schema: nomencladores; Owner: postgres
--

ALTER TABLE ONLY reparto
    ADD CONSTRAINT fkreparto752927 FOREIGN KEY (municipioid) REFERENCES municipio(id);


--
-- TOC entry 2485 (class 2606 OID 170025)
-- Dependencies: 2431 1816 1817
-- Name: fktalla109538; Type: FK CONSTRAINT; Schema: nomencladores; Owner: postgres
--

ALTER TABLE ONLY talla
    ADD CONSTRAINT fktalla109538 FOREIGN KEY (talla_tipoid) REFERENCES talla_tipo(id);


--
-- TOC entry 2486 (class 2606 OID 170030)
-- Dependencies: 1819 1819 2435
-- Name: fkubicacion_125144; Type: FK CONSTRAINT; Schema: nomencladores; Owner: postgres
--

ALTER TABLE ONLY ubicacion_defensa_tipo
    ADD CONSTRAINT fkubicacion_125144 FOREIGN KEY (ubicacion_defensa_tipoid) REFERENCES ubicacion_defensa_tipo(id);


SET search_path = pago, pg_catalog;

--
-- TOC entry 2489 (class 2606 OID 170853)
-- Dependencies: 1823 2453 1827
-- Name: contrato_trabajadorid_fkey; Type: FK CONSTRAINT; Schema: pago; Owner: postgres
--

ALTER TABLE ONLY contrato
    ADD CONSTRAINT contrato_trabajadorid_fkey FOREIGN KEY (trabajadorid) REFERENCES plantilla.trabajador(id);


--
-- TOC entry 2488 (class 2606 OID 170035)
-- Dependencies: 2401 1823 1800
-- Name: fkcontrato711614; Type: FK CONSTRAINT; Schema: pago; Owner: postgres
--

ALTER TABLE ONLY contrato
    ADD CONSTRAINT fkcontrato711614 FOREIGN KEY (contrato_tipoid) REFERENCES nomencladores.contrato_tipo(id);


--
-- TOC entry 2487 (class 2606 OID 170040)
-- Dependencies: 1821 1822 2439
-- Name: fkcontratooo605780; Type: FK CONSTRAINT; Schema: pago; Owner: postgres
--

ALTER TABLE ONLY contratoooo
    ADD CONSTRAINT fkcontratooo605780 FOREIGN KEY (clienteid) REFERENCES cliente(id);


--
-- TOC entry 2490 (class 2606 OID 170045)
-- Dependencies: 1790 1824 2381
-- Name: fkproyecto578244; Type: FK CONSTRAINT; Schema: pago; Owner: postgres
--

ALTER TABLE ONLY proyecto
    ADD CONSTRAINT fkproyecto578244 FOREIGN KEY (areaid) REFERENCES nomencladores.area(id);


--
-- TOC entry 2491 (class 2606 OID 170050)
-- Dependencies: 1822 1824 2441
-- Name: fkproyecto935193; Type: FK CONSTRAINT; Schema: pago; Owner: postgres
--

ALTER TABLE ONLY proyecto
    ADD CONSTRAINT fkproyecto935193 FOREIGN KEY (contratooooid) REFERENCES contratoooo(id);


--
-- TOC entry 2492 (class 2606 OID 170055)
-- Dependencies: 1793 1825 2387
-- Name: fkreporte_pa638191; Type: FK CONSTRAINT; Schema: pago; Owner: postgres
--

ALTER TABLE ONLY reporte_pago
    ADD CONSTRAINT fkreporte_pa638191 FOREIGN KEY (anno_mesid) REFERENCES nomencladores.anno_mes(id);


--
-- TOC entry 2493 (class 2606 OID 170060)
-- Dependencies: 1824 1825 2445
-- Name: fkreporte_pa895852; Type: FK CONSTRAINT; Schema: pago; Owner: postgres
--

ALTER TABLE ONLY reporte_pago
    ADD CONSTRAINT fkreporte_pa895852 FOREIGN KEY (proyectoid) REFERENCES proyecto(id);


--
-- TOC entry 2511 (class 2606 OID 170065)
-- Dependencies: 1824 1828 2445
-- Name: fktrabajador463526; Type: FK CONSTRAINT; Schema: pago; Owner: postgres
--

ALTER TABLE ONLY trabajador_proyecto
    ADD CONSTRAINT fktrabajador463526 FOREIGN KEY (proyectoid) REFERENCES proyecto(id);


SET search_path = plantilla, pg_catalog;

--
-- TOC entry 2512 (class 2606 OID 170075)
-- Dependencies: 1811 1829 2419
-- Name: fkcargo114301; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY cargo
    ADD CONSTRAINT fkcargo114301 FOREIGN KEY (norma_juridicaid) REFERENCES nomencladores.norma_juridica(id);


--
-- TOC entry 2513 (class 2606 OID 170080)
-- Dependencies: 1829 1797 2395
-- Name: fkcargo290174; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY cargo
    ADD CONSTRAINT fkcargo290174 FOREIGN KEY (clasificacion_d_iid) REFERENCES nomencladores.clasificacion_d_i(id);


--
-- TOC entry 2514 (class 2606 OID 170085)
-- Dependencies: 1829 1810 2417
-- Name: fkcargo520587; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY cargo
    ADD CONSTRAINT fkcargo520587 FOREIGN KEY (nivel_preparacionid) REFERENCES nomencladores.nivel_preparacion(id);


--
-- TOC entry 2515 (class 2606 OID 170090)
-- Dependencies: 2407 1829 1804
-- Name: fkcargo81079; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY cargo
    ADD CONSTRAINT fkcargo81079 FOREIGN KEY (grupo_escalaid) REFERENCES nomencladores.grupo_escala(id);


--
-- TOC entry 2516 (class 2606 OID 170095)
-- Dependencies: 1796 1829 2393
-- Name: fkcargo958044; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY cargo
    ADD CONSTRAINT fkcargo958044 FOREIGN KEY (categoria_ocupacionalid) REFERENCES nomencladores.categoria_ocupacional(id);


--
-- TOC entry 2517 (class 2606 OID 170100)
-- Dependencies: 1832 1830 2463
-- Name: fkcargo_real834985; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY listado_cargos
    ADD CONSTRAINT fkcargo_real834985 FOREIGN KEY (resolucionid) REFERENCES resolucion(id);


--
-- TOC entry 2520 (class 2606 OID 170105)
-- Dependencies: 1799 1831 2399
-- Name: fkcondecorac292914; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY condecoracion
    ADD CONSTRAINT fkcondecorac292914 FOREIGN KEY (condecoracion_tipoid) REFERENCES nomencladores.condecoracion_tipo(id);


--
-- TOC entry 2518 (class 2606 OID 170110)
-- Dependencies: 1829 1830 2457
-- Name: fklistado_ca383570; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY listado_cargos
    ADD CONSTRAINT fklistado_ca383570 FOREIGN KEY (cargoid) REFERENCES cargo(id);


--
-- TOC entry 2519 (class 2606 OID 170115)
-- Dependencies: 1790 1830 2381
-- Name: fklistado_ca638674; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY listado_cargos
    ADD CONSTRAINT fklistado_ca638674 FOREIGN KEY (areaid) REFERENCES nomencladores.area(id);


--
-- TOC entry 2521 (class 2606 OID 170120)
-- Dependencies: 1795 1833 2391
-- Name: fkoficial163315; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY oficial
    ADD CONSTRAINT fkoficial163315 FOREIGN KEY (cargo_militarid) REFERENCES nomencladores.cargo_militar(id);


--
-- TOC entry 2522 (class 2606 OID 170125)
-- Dependencies: 1833 2405 1803
-- Name: fkoficial246168; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY oficial
    ADD CONSTRAINT fkoficial246168 FOREIGN KEY (grado_militarid) REFERENCES nomencladores.grado_militar(id);


--
-- TOC entry 2523 (class 2606 OID 170130)
-- Dependencies: 1833 2453 1827
-- Name: fkoficial711484; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY oficial
    ADD CONSTRAINT fkoficial711484 FOREIGN KEY (trabajadorid) REFERENCES trabajador(id);


--
-- TOC entry 2494 (class 2606 OID 170135)
-- Dependencies: 2443 1826 1823
-- Name: fkplantilla572754; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY plantilla
    ADD CONSTRAINT fkplantilla572754 FOREIGN KEY (contratoid) REFERENCES pago.contrato(id);


--
-- TOC entry 2495 (class 2606 OID 170140)
-- Dependencies: 1826 1830 2459
-- Name: fkplantilla821371; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY plantilla
    ADD CONSTRAINT fkplantilla821371 FOREIGN KEY (listado_cargosid) REFERENCES listado_cargos(id);


--
-- TOC entry 2499 (class 2606 OID 170150)
-- Dependencies: 1827 1798 2397
-- Name: fktrabajador158965; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador158965 FOREIGN KEY (color_pielid) REFERENCES nomencladores.color_piel(id);


--
-- TOC entry 2500 (class 2606 OID 170155)
-- Dependencies: 1827 2403 1802
-- Name: fktrabajador172052; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador172052 FOREIGN KEY (estado_civilid) REFERENCES nomencladores.estado_civil(id);


--
-- TOC entry 2501 (class 2606 OID 170160)
-- Dependencies: 1827 2423 1813
-- Name: fktrabajador255020; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador255020 FOREIGN KEY (registro_militarid) REFERENCES nomencladores.registro_militar(id);


--
-- TOC entry 2524 (class 2606 OID 170165)
-- Dependencies: 1834 2461 1831
-- Name: fktrabajador269490; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador_condecoracion
    ADD CONSTRAINT fktrabajador269490 FOREIGN KEY (condecoracionid) REFERENCES condecoracion(id);


--
-- TOC entry 2502 (class 2606 OID 170170)
-- Dependencies: 1827 2427 1815
-- Name: fktrabajador398004; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador398004 FOREIGN KEY (sexoid) REFERENCES nomencladores.sexo(id);


--
-- TOC entry 2503 (class 2606 OID 170175)
-- Dependencies: 1827 2411 1806
-- Name: fktrabajador434011; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador434011 FOREIGN KEY (lugar_procedenciaid) REFERENCES nomencladores.lugar_procedencia(id);


--
-- TOC entry 2525 (class 2606 OID 170180)
-- Dependencies: 2453 1827 1834
-- Name: fktrabajador472841; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador_condecoracion
    ADD CONSTRAINT fktrabajador472841 FOREIGN KEY (trabajadorid) REFERENCES trabajador(id);


--
-- TOC entry 2504 (class 2606 OID 170185)
-- Dependencies: 1816 2429 1827
-- Name: fktrabajador513039; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador513039 FOREIGN KEY (talla_camisa_blusa) REFERENCES nomencladores.talla(id);


--
-- TOC entry 2505 (class 2606 OID 170190)
-- Dependencies: 1820 2437 1827
-- Name: fktrabajador537171; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador537171 FOREIGN KEY (ubicacion_excepcionalid) REFERENCES nomencladores.ubicacion_excepcional(id);


--
-- TOC entry 2506 (class 2606 OID 170195)
-- Dependencies: 1816 2429 1827
-- Name: fktrabajador777498; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador777498 FOREIGN KEY (talla_pantalon_saya) REFERENCES nomencladores.talla(id);


--
-- TOC entry 2507 (class 2606 OID 170200)
-- Dependencies: 1814 2425 1827
-- Name: fktrabajador794981; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador794981 FOREIGN KEY (repartoid) REFERENCES nomencladores.reparto(id);


--
-- TOC entry 2508 (class 2606 OID 170205)
-- Dependencies: 1805 2409 1827
-- Name: fktrabajador849619; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador849619 FOREIGN KEY (integracionid) REFERENCES nomencladores.integracion(id);


--
-- TOC entry 2509 (class 2606 OID 170210)
-- Dependencies: 2415 1809 1827
-- Name: fktrabajador93281; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador93281 FOREIGN KEY (nivel_culturalid) REFERENCES nomencladores.nivel_cultural(id);


--
-- TOC entry 2510 (class 2606 OID 170215)
-- Dependencies: 2429 1816 1827
-- Name: fktrabajador938351; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador938351 FOREIGN KEY (talla_zapato) REFERENCES nomencladores.talla(id);


--
-- TOC entry 2526 (class 2606 OID 170220)
-- Dependencies: 1835 1819 2435
-- Name: fkubicacion_38554; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY ubicacion_defensa
    ADD CONSTRAINT fkubicacion_38554 FOREIGN KEY (ubicacion_defensa_tipoid) REFERENCES nomencladores.ubicacion_defensa_tipo(id);


--
-- TOC entry 2527 (class 2606 OID 170225)
-- Dependencies: 2453 1827 1835
-- Name: fkubicacion_709173; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY ubicacion_defensa
    ADD CONSTRAINT fkubicacion_709173 FOREIGN KEY (trabajadorid) REFERENCES trabajador(id);


--
-- TOC entry 2497 (class 2606 OID 170758)
-- Dependencies: 1826 1838 2475
-- Name: horario; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY plantilla
    ADD CONSTRAINT horario FOREIGN KEY (htrabajo_id) REFERENCES nomencladores.horario_trabajo(id);


--
-- TOC entry 2496 (class 2606 OID 170749)
-- Dependencies: 2471 1826 1836
-- Name: plantilla_fpago_id_fkey; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY plantilla
    ADD CONSTRAINT plantilla_fpago_id_fkey FOREIGN KEY (fpago_id) REFERENCES nomencladores.forma_pago(id);


--
-- TOC entry 2498 (class 2606 OID 170764)
-- Dependencies: 1826 1837 2473
-- Name: spago; Type: FK CONSTRAINT; Schema: plantilla; Owner: postgres
--

ALTER TABLE ONLY plantilla
    ADD CONSTRAINT spago FOREIGN KEY (spago_id) REFERENCES nomencladores.sistema_pago(id);


--
-- TOC entry 2584 (class 0 OID 0)
-- Dependencies: 12
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2013-07-18 16:43:43

--
-- PostgreSQL database dump complete
--

