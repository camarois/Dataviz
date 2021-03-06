"use strict";

/**
 * Fichier permettant de dessiner le graphique à bandes.
 */


/**
 * Crée les axes du graphique à bandes.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 */
function createAxes(g, xAxis, yAxis, height) {
  // TODO: Dessiner les axes X et Y du graphique. Assurez-vous d'indiquer un titre pour l'axe Y.
  // Axe horizontal
      g.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(30)");

      g.append("g")
          .attr("class", "yaxis")
          .call(yAxis);

      g.append("text")
          .attr("class", "yaxis-label")
          .attr("text-anchor", "end")
          .attr("x", 84)
          .attr("y", -20)
          .text("Nombre de trajets");
		  
}

/**
 * Crée le graphique à bandes.
 *
 * @param g             Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param currentData   Les données à utiliser.
 * @param x             L'échelle pour l'axe X.
 * @param y             L'échelle pour l'axe Y.
 * @param color         L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param tip           L'infobulle à afficher lorsqu'une barre est survolée.
 * @param height        La hauteur du graphique.
 */
function createBarChart(g, currentData, x, y, color, tip, height) {
  // TODO: Dessiner les cercles à bandes en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'une barre est survolée.
      g.selectAll("rect")
         .data(currentData.destinations)
         .enter()
         .append("rect")
         .attr("class","bar")
         .attr("id", d => d.name)
         .attr("x", d => x(d.name))
         .attr("y", d => y(d.count))
         .attr("width", 50)
         .attr("height", d => height - y(d.count))
         .attr("fill", d => color(d.name))
         .attr("transform", "translate(" + 20 + ")")
         .on('mouseover', tip.show)
         .on('mouseout', tip.hide);
}

/**
 * Réalise une transition entre les données actuellement utilisées et les nouvelles qui doivent être utilisées.
 *
 * @param g         Le groupe SVG dans lequel le graphique à bandes est dessiné.
 * @param newData   Les nouvelles données à utiliser.
 * @param y         L'échelle pour l'axe Y.
 * @param yAxis     L'axe Y.
 * @param height    La hauteur du graphique.
 */
function transition(g, newData, y, yAxis, height) {
  /* TODO:
   - Réaliser une transition pour mettre à jour l'axe des Y et la hauteur des barres à partir des nouvelles données.
   - La transition doit se faire en 1 seconde.
   */
      g.selectAll("rect")
         .data(newData.destinations)
         .transition().duration(1000)
         .attr("y", d => y(d.count))
         .attr("height", d => height - y(d.count));

      g.select(".yaxis")
          .transition().duration(1000)
          .call(yAxis);
}

/**
 * Obtient le texte associé à l'infobulle.
 *
 * @param d               Les données associées à la barre survollée par la souris.
 * @param currentData     Les données qui sont actuellement utilisées.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 * @return {string}       Le texte à afficher dans l'infobulle.
 */
function getToolTipText(d, currentData, formatPercent) {
  // TODO: Retourner le texte à afficher dans l'infobulle selon le format demandé.
  //       Assurez-vous d'utiliser la fonction "formatPercent" pour formater le pourcentage correctement.
      var sumDestinations = d3.sum(currentData.destinations, d => d.count);
      
      return d.count + " (" + formatPercent(d.count/sumDestinations) +  ")";
}
